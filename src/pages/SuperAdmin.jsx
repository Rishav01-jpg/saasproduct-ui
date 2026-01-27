import { useEffect, useState } from "react";
import api from "../utils/api";

export default function SuperAdmin() {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [extendDays, setExtendDays] = useState({});

  useEffect(() => {
    loadUsers();
    loadSubscriptions();
    loadAuditLogs();
  }, []);

  const loadUsers = async () => {
    const res = await api.get("/api/super/users");
    setUsers(res.data);
  };

  const loadSubscriptions = async () => {
    const res = await api.get("/api/super/subscriptions");
    setSubscriptions(res.data);
  };

  const loadAuditLogs = async () => {
    const res = await api.get("/api/super/audit-logs");
    setAuditLogs(res.data);
  };

  const toggleAdminBlock = async (id) => {
    await api.put(`/api/super/user/${id}/block`);
    loadUsers();
    loadAuditLogs();
  };

  const toggleSubscription = async (id) => {
    await api.put(`/api/super/subscription/${id}/toggle`);
    loadSubscriptions();
    loadAuditLogs();
  };

  const extendSubscription = async (id) => {
    const days = extendDays[id];
    if (!days || days <= 0) return alert("Enter valid days");

    await api.put(`/api/super/subscription/${id}/extend`, {
      extraDays: Number(days)
    });

    setExtendDays((p) => ({ ...p, [id]: "" }));
    loadSubscriptions();
    loadAuditLogs();
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: radial-gradient(circle at top, #1a1a2e, #000);
          font-family: "Segoe UI", sans-serif;
          color: #fff;
        }

        .page {
          padding: 20px;
          min-height: 100vh;
        }

        h1 {
          font-size: 32px;
          color: #c084fc;
          margin-bottom: 30px;
        }

        h2 {
          margin: 20px 0 10px;
          color: #e9d5ff;
        }

        /* TABLE */
        .table-wrapper {
          overflow-x: auto;
          background: rgba(255,255,255,0.05);
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        th, td {
          padding: 12px;
          text-align: left;
        }

        th {
          background: rgba(255,255,255,0.1);
        }

        tr {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        tr:hover {
          background: rgba(255,255,255,0.05);
        }

        /* BUTTONS */
        button {
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          border: none;
          color: white;
          padding: 6px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(147,51,234,0.4);
        }

        .blocked {
          color: #f87171;
        }

        .active {
          color: #4ade80;
        }

        /* SUBSCRIPTION CARDS */
        .card-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .card {
          background: rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
        }

        .card small {
          opacity: 0.8;
        }

        .card input {
          width: 70px;
          padding: 6px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
          color: white;
        }

        /* LOGS */
        .logs {
          max-height: 300px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .log {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .log b {
          color: #c084fc;
        }

        @media (max-width: 600px) {
          h1 {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="page">
        <h1>🚀 Super Admin Dashboard</h1>

        {/* USERS */}
        <h2>Users</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className={u.isBlocked ? "blocked" : "active"}>
                    {u.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td>
                    {u.role === "admin" && (
                      <button onClick={() => toggleAdminBlock(u._id)}>
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SUBSCRIPTIONS */}
        <h2>Subscriptions</h2>
        <div className="card-grid">
          {subscriptions.map((s) => (
            <div className="card" key={s._id}>
              <small>{s.email}</small>
              <p>
                Status:{" "}
                <span className={s.active ? "active" : "blocked"}>
                  {s.active ? "Active" : "Inactive"}
                </span>
              </p>
              <p>Ends: {new Date(s.endDate).toLocaleDateString()}</p>

              <button onClick={() => toggleSubscription(s._id)}>
                Toggle
              </button>

              <div style={{ marginTop: 10 }}>
                <input
                  type="number"
                  placeholder="Days"
                  value={extendDays[s._id] || ""}
                  onChange={(e) =>
                    setExtendDays({ ...extendDays, [s._id]: e.target.value })
                  }
                />
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => extendSubscription(s._id)}
                >
                  Extend
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AUDIT LOGS */}
        <h2>Audit Logs</h2>
        <div className="logs">
          {auditLogs.map((log) => (
            <div className="log" key={log._id}>
              <b>{log.action}</b>
              <p>{log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

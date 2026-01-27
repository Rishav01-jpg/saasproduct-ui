import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const tenantId = localStorage.getItem("tenantId");

  const [dashboards, setDashboards] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamLoading, setTeamLoading] = useState(false);
  const [error, setError] = useState("");

  const [dashName, setDashName] = useState("");

  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffRole, setStaffRole] = useState("staff");
  const [staffDashboardId, setStaffDashboardId] = useState("");

  useEffect(() => {
    if (!token || role === "superadmin") {
      navigate("/login");
      return;
    }

    fetchDashboards();
    fetchTeam();
  }, []);

  const fetchDashboards = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) return setError(data.msg);
      setDashboards(data);
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeam = async () => {
    try {
      setTeamLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/team`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) return setError(data.msg);
      setTeam(data);
    } catch {
      setError("Failed to load team");
    } finally {
      setTeamLoading(false);
    }
  };

  const createDashboard = async () => {
    if (!dashName) return setError("Dashboard name required");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: dashName, tenantId })
    });

    const data = await res.json();
    if (!res.ok) return setError(data.msg);

    setDashboards([...dashboards, data.dashboard]);
    setDashName("");
    setError("");
  };

  const createStaff = async () => {
    if (!staffName || !staffEmail || !staffPassword || !staffDashboardId) {
      return setError("All staff fields required");
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: staffName,
        email: staffEmail,
        password: staffPassword,
        role: staffRole,
        dashboardId: staffDashboardId
      })
    });

    const data = await res.json();
    if (!res.ok) return setError(data.msg);

    alert(`${staffRole} created`);
    setStaffName(""); setStaffEmail(""); setStaffPassword(""); setStaffDashboardId("");
    fetchTeam(); // refresh list
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/team/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) return alert(data.msg);

    setTeam(team.filter(u => u._id !== id));
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dash-layout">
      <aside className="sidebar">
        <h2>CRM</h2>
        <p>Role: {role}</p>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="dash-main">
        <h1>Dashboard</h1>
        {error && <p className="dash-error">{error}</p>}
        {loading && <p>Loading...</p>}

        {role === "admin" && (
          <div className="box">
            <h3>Create Dashboard</h3>
            <input placeholder="Dashboard Name" value={dashName} onChange={(e) => setDashName(e.target.value)} />
            <button onClick={createDashboard}>Create</button>
          </div>
        )}

        <div className="cards">
          {dashboards.map((d) => (
            <div key={d._id} className="card clickable" onClick={() => navigate(`/dashboard/${d._id}`)}>
              <h3>{d.name}</h3>
            </div>
          ))}
        </div>

        {role === "admin" && dashboards.length > 0 && (
          <div className="box">
            <h3>Create Staff / Manager</h3>
            <input placeholder="Name" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
            <input placeholder="Email" value={staffEmail} onChange={(e) => setStaffEmail(e.target.value)} />
            <input placeholder="Password" value={staffPassword} onChange={(e) => setStaffPassword(e.target.value)} />

            <select value={staffRole} onChange={(e) => setStaffRole(e.target.value)}>
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
            </select>

            <select value={staffDashboardId} onChange={(e) => setStaffDashboardId(e.target.value)}>
              <option value="">Select Dashboard</option>
              {dashboards.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>

            <button onClick={createStaff}>Create User</button>
          </div>
        )}

        {role === "admin" && (
          <div className="box">
            <h3>Your Team</h3>
            {teamLoading && <p>Loading team...</p>}
            {team.map(member => (
              <div key={member._id} className="team-row">
                <div>
                  <strong>{member.name}</strong> ({member.role})
                  <p className="team-sub">Dashboard: {member.dashboardId?.name || "Not Assigned"}</p>
                </div>
                <button className="delete-btn" onClick={() => deleteUser(member._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

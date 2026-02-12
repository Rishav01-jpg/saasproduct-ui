import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function SingleDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [scheduledCalls, setScheduledCalls] = useState([]);
const [showCallsModal, setShowCallsModal] = useState(false);
const [showHistory, setShowHistory] = useState(false);

const activeCalls = scheduledCalls.filter(c => c.status === "Scheduled");
const historyCalls = scheduledCalls.filter(c => c.status !== "Scheduled");

  /* ===============================
     AUTH CHECK + LOAD DASHBOARD
  =============================== */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadDashboard();
  }, []);
useEffect(() => {
  if (id && token) {
    loadScheduledCalls();
  }
}, [id]);

  /* ===============================
     LOAD DASHBOARD INFO
     (from already fetched list logic)
  =============================== */
  const loadDashboard = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/dashboard/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Failed to load dashboard");
        setLoading(false);
        return;
      }

      const found = data.find((d) => d._id === id);

      if (!found) {
        setError("Dashboard not found or access denied");
        setLoading(false);
        return;
      }

      setDashboard(found);
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };
const loadScheduledCalls = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/leads/scheduled-calls?dashboardId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (res.ok) {
      setScheduledCalls(data);
    }
  } catch (err) {
    console.error("Failed to load scheduled calls");
  }
};
const updateCallStatus = async (callId, status) => {
  try {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/leads/scheduled-calls/${callId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    loadScheduledCalls(); // refresh
  } catch (err) {
    alert("Failed to update call");
  }
};

const cancelCall = async (callId) => {
  try {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/leads/scheduled-calls/${callId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadScheduledCalls();
  } catch (err) {
    alert("Failed to cancel call");
  }
};

  /* ===============================
     LOGOUT
  =============================== */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="dash-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>CRM</h2>

        <button onClick={() => navigate("/dashboard")}>
          ← All Dashboards
        </button>

        <p style={{ marginTop: "10px" }}>
          Role: <strong>{role}</strong>
        </p>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        {loading && <p>Loading dashboard...</p>}
        {error && <p className="dash-error">{error}</p>}

        {!loading && dashboard && (
          <>
            <h1>{dashboard.name}</h1>
            <p className="muted">
              Tenant ID: {dashboard.tenantId}
            </p>

            {/* ===============================
               DASHBOARD MODULES (PLACEHOLDERS)
            =============================== */}
            <div className="cards">
              <div
  className="card clickable"
  onClick={() => navigate(`/dashboard/${id}/leads`)}
>
  <h3>Leads</h3>
  <p>Manage leads for this dashboard</p>
</div>


              <div className="card clickable">
                <h3>Contacts</h3>
                <p>Customer & client contacts</p>
              </div>

              <div
  className="card clickable"
  onClick={() => {
    setShowCallsModal(true);
    loadScheduledCalls();
  }}
>
  <h3>Calls</h3>
  <p>{activeCalls.length} Scheduled Calls</p>

</div>


              {role === "admin" && (
                <div className="card clickable">
                  <h3>Staff</h3>
                  <p>Manage staff & managers</p>
                </div>
              )}
            </div>
          </>
        )}
       {showCallsModal && (
  <div className="modal-overlay">
    <div className="modal-box large">

      {/* HEADER */}
      <div className="modal-header">
        <h2>{showHistory ? "📜 Call History" : "📅 Scheduled Calls"}</h2>

        <div className="modal-header-buttons">
          {!showHistory ? (
            <button className="history-btn" onClick={() => setShowHistory(true)}>
              View History
            </button>
          ) : (
            <button className="history-btn" onClick={() => setShowHistory(false)}>
              Back to Scheduled
            </button>
          )}

          <button
            className="cancel-btn"
            onClick={() => {
              setShowCallsModal(false);
              setShowHistory(false);
              loadScheduledCalls();
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* EMPTY MESSAGE */}
      {(showHistory ? historyCalls : activeCalls).length === 0 && (
        <p className="empty-text">
          No {showHistory ? "history" : "scheduled"} calls
        </p>
      )}

      {/* CALL LIST */}
      {(showHistory ? historyCalls : activeCalls).map(call => (
        <div key={call._id} className={`call-row status-${call.status?.toLowerCase()}`}>
          <div>
            <strong>{call.leadId?.name}</strong><br />
            📱 {call.phone}<br />
            ⏰ {new Date(call.scheduledAt).toLocaleString()}<br />
            Status: <b>{call.status}</b>
          </div>

          {!showHistory && (
            <div className="call-actions">
              <button onClick={() => updateCallStatus(call._id, "Completed")}>✅</button>
              <button onClick={() => updateCallStatus(call._id, "Missed")}>❌</button>
              <button onClick={() => cancelCall(call._id)}>🗑️</button>
            </div>
          )}
        </div>
      ))}

    </div>
  </div>
)}


      </main>
    </div>
  );
}

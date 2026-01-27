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
              <div className="card clickable">
                <h3>Leads</h3>
                <p>Manage leads for this dashboard</p>
              </div>

              <div className="card clickable">
                <h3>Contacts</h3>
                <p>Customer & client contacts</p>
              </div>

              <div className="card clickable">
                <h3>Calls</h3>
                <p>Call logs & scheduling</p>
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
      </main>
    </div>
  );
}

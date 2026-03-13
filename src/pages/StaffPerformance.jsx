import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/callhistory.css";

const StaffPerformance = () => {
  const { id: dashboardId } = useParams();
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPerformance = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/performance/staff", {
        params: { dashboardId }
      });

      if (Array.isArray(res.data)) {
        setStaff(res.data);
      } else {
        setStaff([]);
      }

    } catch (err) {
      console.error("Failed to load staff performance", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dashboardId) {
      fetchPerformance();
    }
  }, [dashboardId]);

  return (
   <div className="call-history-page staff-performance-page">

      <h2 className="page-title">Staff Performance</h2>

      <div className="card call-history-table">

        {/* HEADER (desktop only) */}
       <div className="call-history-row table-header">
  <div>Staff</div>
  <div>Role</div>
  <div>Leads Assigned</div>
  <div>Assigned By</div>
  <div>Leads Won</div>
  <div>Calls Made</div>
  <div>Conversion</div>
</div>

        {loading ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            Loading performance...
          </div>
        ) : staff.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No staff performance data
          </div>
        ) : (
          staff.map(item => (

            <div key={item.userId} className="call-history-row">

              {/* STAFF */}
              <div className="cell">
                <span className="cell-label">Staff</span>
                <strong>{item.name}</strong>
              </div>

              {/* ROLE */}
              <div className="cell">
                <span className="cell-label">Role</span>
                <span className="status-badge contacted">
                  {item.role}
                </span>
              </div>

              {/* LEADS ASSIGNED */}
              <div className="cell">
                <span className="cell-label">Leads Assigned</span>
                {item.leadsAssigned}
              </div>
              {/* ASSIGNED BY */}
<div className="cell">
  <span className="cell-label">Assigned By</span>
  {item.assignedBy || "-"}
</div>

              {/* LEADS WON */}
              <div className="cell">
                <span className="cell-label">Leads Won</span>
                {item.leadsWon}
              </div>

              {/* CALLS */}
              <div className="cell">
                <span className="cell-label">Calls Made</span>
                {item.callsMade}
              </div>

              {/* CONVERSION */}
              <div className="cell">
                <span className="cell-label">Conversion</span>
                <span className="status-badge won">
                  {item.conversionRate}%
                </span>
              </div>

            </div>

          ))
        )}

      </div>
    </div>
  );
};

export default StaffPerformance;
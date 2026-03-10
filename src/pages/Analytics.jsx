import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import "../styles/leads.css";


const COLORS = ["#7c3aed", "#22c55e", "#ef4444", "#f59e0b", "#3b82f6", "#14b8a6"];

const Analytics = () => {
  const { id: dashboardId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
const role = localStorage.getItem("role");

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  const [period, setPeriod] = useState("month");
  const [data, setData] = useState({
    totals: {},
    funnel: {},
    outcomes: [],
    leadSources: []
  });
const [staffStats, setStaffStats] = useState([]);
const [leadAssignments, setLeadAssignments] = useState([]);
useEffect(() => {
 
}, []);

  const fetchAnalytics = async (selectedPeriod) => {
    try {
      const res = await api.get("/api/analytics/overview", {
        params: { dashboardId, period: selectedPeriod }
      });
      setData(res.data);
    } catch (err) {
      console.error("Analytics error", err);
    }
  };
const fetchStaffDistribution = async () => {
  try {
    const res = await api.get("/api/leads/stats/staff-distribution", {
  params: { dashboardId }
});

    setStaffStats(res.data);

  } catch (err) {
    console.error("Staff distribution error", err);
  }
};
const fetchLeadAssignments = async () => {
  try {
    const res = await api.get("/api/leads/stats/lead-assignments", {
      params: { dashboardId }
    });

    setLeadAssignments(res.data);

  } catch (err) {
    console.error("Assignment fetch error", err);
  }
};
useEffect(() => {
  if (dashboardId) {
    fetchAnalytics(period);
    fetchStaffDistribution();
    fetchLeadAssignments();
  }
}, [dashboardId, period]);
  return (
    <div className="leads-page">
      <h2 className="page-title"> Detailed Analytics</h2>

      {/* DATE FILTER */}
      <div className="filter-bar">
        {["day", "week", "month", "year"].map(p => (
          <button
            key={p}
            className={`filter-btn ${period === p ? "active" : ""}`}
            onClick={() => setPeriod(p)}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TOP METRICS */}
      <div className="stats-grid">
        <div className="stat-card"><h4>Total Leads</h4><p>{data.totals.totalLeads || 0}</p></div>
        <div className="stat-card"><h4>Total Calls</h4><p>{data.totals.totalCalls || 0}</p></div>
        <div className="stat-card"><h4>Calls Today</h4><p>{data.totals.callsToday || 0}</p></div>
        <div className="stat-card"><h4>Conversion Rate</h4><p>{data.totals.conversionRate || 0}%</p></div>
      </div>

      {/* LEAD FUNNEL */}
      <div className="card">
        <h3>Lead Funnel</h3>
        <div className="funnel-grid">
          <div className="funnel-box">New<br /><strong>{data.funnel.new || 0}</strong></div>
          <div className="funnel-box">Contacted<br /><strong>{data.funnel.contacted || 0}</strong></div>
          <div className="funnel-box">Qualified<br /><strong>{data.funnel.qualified || 0}</strong></div>
          <div className="funnel-box">Won<br /><strong>{data.funnel.won || 0}</strong></div>
          <div className="funnel-box">Lost<br /><strong>{data.funnel.lost || 0}</strong></div>
        </div>
      </div>

      {/* CALL OUTCOMES PIE CHART */}
      <div className="card">
        <h3>Call Outcomes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data.outcomes} dataKey="count" nameKey="label" outerRadius={100} label>
              {data.outcomes.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      

      {/* LEAD SOURCES BAR CHART */}
      <div className="card">
        <h3>Lead Sources</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.leadSources}>
            <XAxis dataKey="source" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="count" fill="#7c3aed" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* STAFF LEAD DISTRIBUTION */}
{role !== "staff" && (
<div className="card">
  <h3>👥 Staff Lead Distribution</h3>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={staffStats}>
      <XAxis dataKey="staffName" stroke="#fff" />
      <YAxis stroke="#fff" />
      <Tooltip />
      <Bar dataKey="totalLeads" fill="#22c55e" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>
)}

{/* LEAD ASSIGNMENT REPORT */}

{role !== "staff" && (
<div className="card assignment-card">
  <h3> Lead Assignment Report</h3>

  <div className="assignment-table-wrapper">
    <table className="assignment-table">
      <thead>
        <tr>
          <th>Lead</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Assigned To</th>
          <th>Assigned By</th>
        </tr>
      </thead>

     <tbody>
  {leadAssignments.map((lead) => (
    <tr key={lead._id}>
      <td data-label="Lead">{lead.name}</td>

      <td data-label="Phone">{lead.phone}</td>

      <td data-label="Status">
        <span className={`status-badge status-${lead.status?.toLowerCase()}`}>
          {lead.status}
        </span>
      </td>

      <td data-label="Assigned To">
        {lead.assignedTo?.name || "Unassigned"}
      </td>

      <td data-label="Assigned By">
        {lead.assignedBy?.name || "-"}
      </td>
    </tr>
  ))}
</tbody>
    </table>
  </div>
</div>
)}
    </div>
  );
};

export default Analytics;
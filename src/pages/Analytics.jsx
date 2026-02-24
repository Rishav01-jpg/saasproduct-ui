import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    if (dashboardId) fetchAnalytics(period);
  }, [dashboardId, period]);

  return (
    <div className="leads-page">
      <h2 className="page-title">📊 Detailed Analytics</h2>

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
    </div>
  );
};

export default Analytics;
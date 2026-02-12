import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/leads.css";

const Leads = () => {
  const { id: dashboardId } = useParams(); // ⭐ GET DASHBOARD ID FROM URL
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  // ================= STATE =================
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [followups, setFollowups] = useState([]);
const [showScheduleModal, setShowScheduleModal] = useState(false);
const [selectedLead, setSelectedLead] = useState(null);
const [scheduledAt, setScheduledAt] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
    date: ""
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    followUpDate: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [importing, setImporting] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
const [showCallTypeModal, setShowCallTypeModal] = useState(false);
const [callType, setCallType] = useState(null);
const [currentIndex, setCurrentIndex] = useState(0);
const [isCalling, setIsCalling] = useState(false);
const [showOutcomeModal, setShowOutcomeModal] = useState(false);
const [callStatus, setCallStatus] = useState("");
const [outcome, setOutcome] = useState("");
const [notes, setNotes] = useState("");
const [showExotelModal, setShowExotelModal] = useState(false);
const [exotelSid, setExotelSid] = useState("");
const [exotelToken, setExotelToken] = useState("");
const [isExotelConnected, setIsExotelConnected] = useState(false);
const [exotelApiKey, setExotelApiKey] = useState("");
const [callerId, setCallerId] = useState("");
const stopCallingRef = useRef(false);


  // ================= FETCH =================
  const fetchLeads = async () => {
    const res = await api.get("/api/leads", {
      params: { ...filters, page, limit: 20, dashboardId }
    });

    setLeads(res.data.leads);
    setTotalPages(res.data.totalPages);
    setSelectedLeads([]);
  };

  const fetchStats = async () => {
    const res = await api.get("/api/leads/stats/summary", {
      params: { dashboardId }
    });
    setStats(res.data);
  };

  const fetchFollowups = async () => {
    const res = await api.get("/api/leads/stats/followups-today", {
      params: { dashboardId }
    });
    setFollowups(res.data);
  };
const startCalling = (type) => {
  if (leads.length === 0) {
    alert("No leads to call");
    return;
  }
  stopCallingRef.current = false;

 // reset stop flag

  // 📱 SIM BASED → START DIRECTLY
  if (type === "SIM") {
    setCallType("SIM");
    setShowCallTypeModal(false);
    setIsCalling(true);
    setCurrentIndex(0);
    callNextLead(0, "SIM");
    return;
  }

  // ☁️ CLOUD CALLING
  if (type === "CLOUD") {
    setShowCallTypeModal(false);

    // ❌ Not connected → show Exotel connect popup
    if (!isExotelConnected) {
      setShowExotelModal(true);
      return;
    }

    // ✅ Already connected → start cloud calling
    setCallType("CLOUD");
    setIsCalling(true);
    setCurrentIndex(0);
    callNextLead(0, "CLOUD");
  }
};


const callNextLead = async (index, type) => {

  // 🛑 STOP CHECK
 if (stopCallingRef.current) {

    setIsCalling(false);
    return;
  }

  if (index >= leads.length) {
    alert("All calls completed");
    setIsCalling(false);
    return;
  }

  const lead = leads[index];

  // 📱 SIM BASED CALLING
  if (type === "SIM") {
    window.open(`tel:${lead.phone}`);
  }

  // ☁️ CLOUD CALLING
  if (type === "CLOUD") {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exotel/call`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ phone: lead.phone })
    });

    if (!res.ok) {
      alert("Cloud call failed.");
      return;
    }
  }

  // show outcome popup
 setTimeout(() => {
  if (!stopCallingRef.current) {
    setSelectedLead(lead);
    setShowOutcomeModal(true);
  }
}, 2000);

};


const saveCallResult = async () => {
  if (!callStatus) {
    alert("Please select call status");
    return;
  }

  // 1️⃣ Save call history
  await fetch(`${import.meta.env.VITE_API_URL}/api/call-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      leadName: selectedLead.name,
      phone: selectedLead.phone,
      callType,
      status: callStatus,
      outcome,
      notes,
      dashboardId
    })
  });

  // 2️⃣ Directly update Lead status (same value)
  await api.put(`/api/leads/${selectedLead._id}`, {
    status: callStatus
  });

  // 3️⃣ Refresh UI
  await fetchLeads();
  await fetchStats();

  moveToNextCall();
};


const skipCall = () => {
  moveToNextCall();
};
const moveToNextCall = () => {
  setShowOutcomeModal(false);
  setCallStatus("");
  setOutcome("");
  setNotes("");

  // 🛑 STOP CHECK
 if (stopCallingRef.current) {

    setIsCalling(false);
    return;
  }

  const nextIndex = currentIndex + 1;

  if (nextIndex >= leads.length) {
  alert("All calls completed");

  stopCallingRef.current = false;   // ✅ reset stop
  setIsCalling(false);
  setCurrentIndex(0);               // ✅ reset index
  return;
}


  setCurrentIndex(nextIndex);
  callNextLead(nextIndex, callType);
};

const saveExotelKeys = async () => {
  if (!exotelSid || !exotelApiKey || !exotelToken || !callerId) {
    alert("Fill all Exotel details");
    return;
  }

  await fetch(`${import.meta.env.VITE_API_URL}/api/users/save-exotel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      sid: exotelSid,
      apiKey: exotelApiKey,
      apiToken: exotelToken,
      callerId: callerId
    })
  });

  setIsExotelConnected(true);
  setShowExotelModal(false);

  // Start cloud calling
  setCallType("CLOUD");
  setIsCalling(true);
  setCurrentIndex(0);
  callNextLead(0, "CLOUD");
};


const checkExotelConnection = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (
      data.exotel &&
      data.exotel.sid &&
      data.exotel.apiKey &&
      data.exotel.apiToken &&
      data.exotel.callerId
    ) {
      setIsExotelConnected(true);
    } else {
      setIsExotelConnected(false); // force popup if anything missing
    }

  } catch (err) {
    console.error("Failed to check Exotel connection");
    setIsExotelConnected(false);
  }
};


const scheduleCall = async () => {
  if (!scheduledAt) {
    alert("Select date & time");
    return;
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/leads/${selectedLead._id}/schedule-call`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scheduledAt: new Date(scheduledAt).toISOString() }),

      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to schedule");
      return;
    }

    alert("Call scheduled!");
    setShowScheduleModal(false);
    setScheduledAt("");
  } catch (err) {
    alert("Server error");
  }
};

  useEffect(() => {
    if (dashboardId) {
      fetchLeads();
      fetchStats();
      fetchFollowups();
      checkExotelConnection();
    }
  }, [filters, page, dashboardId]);

  // ================= CREATE =================
  const createLead = async () => {
    await api.post("/api/leads", { ...form, dashboardId });
    setForm({ name: "", phone: "", email: "", source: "", followUpDate: "" });
    fetchLeads();
    fetchStats();
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    await api.put(`/api/leads/${id}`, { status });
    fetchLeads();
    fetchStats();
  };

  // ================= DELETE =================
  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await api.delete(`/api/leads/${id}`);
    fetchLeads();
    fetchStats();
  };

  // ================= EXPORT CSV =================
  const exportCSV = async () => {
    try {
      const res = await api.get("/api/leads/export", {
        params: { dashboardId },
        responseType: "text"
      });

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leads.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Export failed");
    }
  };

  // ================= IMPORT CSV =================
  const importCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dashboardId", dashboardId);

    try {
      setImporting(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/leads/import`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Leads imported successfully");
      fetchLeads();
      fetchStats();
    } catch {
      alert("Import failed");
    } finally {
      setImporting(false);
    }
  };

  // ================= BULK DELETE =================
  const bulkDelete = async () => {
    if (!selectedLeads.length) return alert("No leads selected");
    if (!window.confirm(`Delete ${selectedLeads.length} leads?`)) return;

    await Promise.all(selectedLeads.map(id => api.delete(`/api/leads/${id}`)));
    fetchLeads();
    fetchStats();
  };

  const toggleSelectLead = (id) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedLeads(selectedLeads.length === leads.length ? [] : leads.map(l => l._id));
  };

  // ================= EDIT =================
  const startEdit = (lead) => {
    setEditingId(lead._id);
    setEditForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      followUpDate: lead.followUpDate?.split("T")[0] || ""
    });
  };

  const saveEdit = async (id) => {
    await api.put(`/api/leads/${id}`, editForm);
    setEditingId(null);
    fetchLeads();
    fetchStats();
  };

  // ================= UI =================
  return (
    <div className="leads-page">
      <h2 className="page-title">Leads Overview</h2>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card"><h4>Total</h4><p>{stats.totalLeads || 0}</p></div>
        <div className="stat-card"><h4>New</h4><p>{stats.newLeads || 0}</p></div>
        <div className="stat-card"><h4>Contacted</h4><p>{stats.contactedLeads || 0}</p></div>
        <div className="stat-card"><h4>Qualified</h4><p>{stats.qualifiedLeads || 0}</p></div>
        <div className="stat-card"><h4>Lost</h4><p>{stats.lostLeads || 0}</p></div>
        <div className="stat-card"><h4>Won</h4><p>{stats.wonLeads || 0}</p></div>
      </div>

      {/* ADD LEAD */}
      <div className="card form-card">
        <h3>Add New Lead</h3>
        <div className="lead-form">
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input placeholder="Source" value={form.source} onChange={e => setForm({...form, source: e.target.value})} />
          <input type="date" value={form.followUpDate} onChange={e => setForm({...form, followUpDate: e.target.value})} />
          <button className="primary-btn" onClick={createLead}>Add Lead</button>
          <button onClick={() => setShowCallTypeModal(true)}>
  🚀 Start Auto Calling
</button>

        </div>
      </div>
       {/* IMPORT EXPORT */}
 <div className="import-export-bar">
        <button className="export-btn" onClick={exportCSV}>⬇ Export CSV</button>
        <label className="import-btn">
          {importing ? "Importing..." : "⬆ Import CSV"}
          <input type="file" accept=".csv" hidden onChange={importCSV} />
        </label>
      </div>
      {/* FILTERS */}
      <div className="lead-filters">
        <input placeholder="Search..." onChange={e => setFilters({...filters, search: e.target.value})} />
        <input type="date" onChange={e => setFilters({...filters, date: e.target.value})} />
        <input placeholder="Source" onChange={e => setFilters({...filters, source: e.target.value})} />
        <select onChange={e => setFilters({...filters, status: e.target.value})}>
          <option value="">All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
          <option>Won</option>
        </select>
      </div>

      

      {/* BULK */}
      <div className="bulk-bar">
        <label><input type="checkbox" onChange={toggleSelectAll}/> Select All</label>
        {selectedLeads.length > 0 && (
          <button className="bulk-delete-btn" onClick={bulkDelete}>
            Delete Selected ({selectedLeads.length})
          </button>
        )}
      </div>

      {/* LEADS LIST */}
      <div className="card">
        {leads.map(lead => (
          <div key={lead._id} className={`lead-row ${editingId === lead._id ? "editing" : ""}`}>
            <input type="checkbox" checked={selectedLeads.includes(lead._id)} onChange={() => toggleSelectLead(lead._id)} />
            {editingId === lead._id ? (
              <>
                <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                <input value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                <input value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                <input value={editForm.source} onChange={e => setEditForm({...editForm, source: e.target.value})} />
                <input type="date" value={editForm.followUpDate} onChange={e => setEditForm({...editForm, followUpDate: e.target.value})} />
                <button onClick={() => saveEdit(lead._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="lead-cell lead-name">
                  <div>{lead.name}</div>
                  <small>{lead.email}</small>
                </div>
                <div>{lead.phone || "—"}</div>
                <div>{lead.source || "—"}</div>
                <div>{lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : "No Follow-up"}</div>
                <select value={lead.status} onChange={e => updateStatus(lead._id, e.target.value)}>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Lost</option>
                  <option>Won</option>
                </select>
                <div className="lead-actions">
                  <button
  className="schedule-btn"
  onClick={() => {
    setSelectedLead(lead);
    setShowScheduleModal(true);
  }}
>
  📅 Schedule
</button>

                  <button onClick={() => startEdit(lead)}>Edit</button>
                  <button onClick={() => deleteLead(lead._id)}>Delete</button>
                  
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* FOLLOWUPS */}
      <div className="card">
        <h3>Today's Follow-ups</h3>
        {followups.length === 0 && <p>No follow-ups today</p>}
        {followups.map(f => (
          <div key={f._id}><strong>{f.name}</strong> — {new Date(f.followUpDate).toLocaleDateString()}</div>
        ))}
      </div>
      {/* ================= SCHEDULE CALL MODAL ================= */}
{showScheduleModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>📅 Schedule Call</h3>

      <p><strong>Lead:</strong> {selectedLead?.name}</p>
      <p><strong>Phone:</strong> {selectedLead?.phone}</p>

      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
      />

      <div className="modal-actions">
        <button className="save-btn" onClick={scheduleCall}>Save</button>
        <button className="cancel-btn" onClick={() => setShowScheduleModal(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
{showCallTypeModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Select Calling Method</h3>

      <button className="call-type-btn" onClick={() => startCalling("SIM")}>

        📱 SIM Based (Free)
      </button>

      <button className="call-type-btn" onClick={() => startCalling("CLOUD")}>

        ☁️ Cloud Calling (Exotel)
      </button>

      <button className="secondary-btn" onClick={() => setShowCallTypeModal(false)}>
  Cancel
</button>

    </div>
  </div>
)}
{showOutcomeModal && (
  <div className="modal-overlay">
    <div className="modal-box" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3>Call Result</h3>

{isCalling && (
  <button
    style={{
      background: "red",
      color: "white",
      marginBottom: "20px",
      display: "block",
      padding: "8px 20px",
      borderRadius: "8px",
      border: "none",
      fontWeight: "bold",
      margin: "0 auto 20px auto"
    }}
    onClick={() => {
  stopCallingRef.current = true;
  setIsCalling(false);
  setCurrentIndex(0);   // ✅ reset index
  setShowOutcomeModal(false);
}}

  >
    🛑 Stop Calling
  </button>
)}

      <select
  className="form-control"
  style={{ width: "80%", margin: "0 auto 12px auto" }}
  value={callStatus}
  onChange={e => setCallStatus(e.target.value)}
>

        <option value="">Select Status</option>
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Lost</option>
         <option>Won</option>
      </select>

      <input
  className="form-control"
  style={{ width: "80%", margin: "0 auto 12px auto" }}
  placeholder="Outcome"
  value={outcome}
  onChange={e => setOutcome(e.target.value)}
/>

      <textarea
  className="form-control"
  style={{ width: "80%", minHeight: "80px", margin: "0 auto 12px auto" }}
  placeholder="Notes"
  value={notes}
  onChange={e => setNotes(e.target.value)}
/>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", width: "100%", marginTop: "10px" }}>
        <button className="primary-btn" onClick={saveCallResult}>
          Save & Next
        </button>
        <button className="secondary-btn" onClick={skipCall}>
          Skip
        </button>
      </div>
    </div>
  </div>
)}
{showExotelModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Connect Exotel</h3>

     <input
  placeholder="Exotel SID"
  value={exotelSid}
  onChange={e => setExotelSid(e.target.value)}
/>

<input
  placeholder="Exotel API Key"
  value={exotelApiKey}
  onChange={e => setExotelApiKey(e.target.value)}
/>

<input
  placeholder="Exotel Auth Token"
  value={exotelToken}
  onChange={e => setExotelToken(e.target.value)}
/>
<input
  placeholder="Exotel Caller ID (Virtual Number)"
  value={callerId}
  onChange={e => setCallerId(e.target.value)}
/>

      <button onClick={saveExotelKeys}>Connect & Start Calling</button>
      <button onClick={() => setShowExotelModal(false)}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Leads;

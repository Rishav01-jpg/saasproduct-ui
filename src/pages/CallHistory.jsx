import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/callhistory.css";

const CallHistory = () => {
  const { id: dashboardId } = useParams();
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });

  // ================= STATE =================
  const [showCallTypeModal, setShowCallTypeModal] = useState(false); // ⭐ UPDATED (added for calling like leads page)
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);   // ⭐ UPDATED
  const [manualCallLead, setManualCallLead] = useState(null);        // ⭐ UPDATED
  const [callType, setCallType] = useState(null);                    // ⭐ UPDATED
  const [callStatus, setCallStatus] = useState("");                  // ⭐ UPDATED
  const [outcome, setOutcome] = useState("");                        // ⭐ UPDATED
  const [notes, setNotes] = useState("");                            // ⭐ UPDATED
  const [selectedLead, setSelectedLead] = useState(null);            // ⭐ UPDATED
  const [isExotelConnected, setIsExotelConnected] = useState(false); // ⭐ UPDATED
  const [showExotelModal, setShowExotelModal] = useState(false);     // ⭐ UPDATED
const [showScheduleModal, setShowScheduleModal] = useState(false);
const [scheduledAt, setScheduledAt] = useState("");

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
const [filters, setFilters] = useState({
  search: "",
  status: "",
  outcome: "", // ⭐ NEW
  date: ""
});

  // ================= CALLING =================
  const startCalling = async (type) => { // ⭐ UPDATED (copied calling flow from Leads.jsx)
    setShowCallTypeModal(false);

    if (!manualCallLead) return;
    const lead = manualCallLead;

    setCallType(type);

    if (!lead.phone) {
      alert("No phone number");
      return;
    }

    // SIM CALL
    if (type === "SIM") {
      window.open(`tel:${lead.phone}`);
    }

    // CLOUD CALL
    if (type === "CLOUD") {
      if (!isExotelConnected) {
        setShowExotelModal(true);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exotel/call`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ phone: lead.phone })
        });

        if (!res.ok) {
          alert("Cloud call failed");
          return;
        }
      } catch {
        alert("Error calling lead");
        return;
      }
    }

    // ⭐ UPDATED: show call result popup after call
    setTimeout(() => {
      setSelectedLead(lead);
      setShowOutcomeModal(true);
    }, 1500);

    setManualCallLead(null);
  };

  // ================= FETCH HISTORY =================
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/call-history", {
        params: { dashboardId }
      });
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch call history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dashboardId) {
      fetchHistory();
    }
  }, [dashboardId]);

  const saveAndOpenSchedule = async () => {
  if (!callStatus) {
    alert("Please select call status");
    return;
  }

  try {
    // 1️⃣ Save call history
    await fetch(`${import.meta.env.VITE_API_URL}/api/call-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        leadId: selectedLead.leadId,
        leadName: selectedLead.name,
        phone: selectedLead.phone,
        callType,
        status: callStatus,
        outcome,
        notes,
        dashboardId
      })
    });

    // 2️⃣ Update lead status
    if (selectedLead.leadId) {
      await api.put(`/api/leads/${selectedLead.leadId}`, {
        status: callStatus
      });
    }

    // 3️⃣ Close result popup
    setShowOutcomeModal(false);

    // 4️⃣ Open schedule modal
    setShowScheduleModal(true);

  } catch (err) {
    alert("Failed to save call result");
  }
};

  // ================= FILTERS =================
  const filteredHistory = history.filter(item => {
    const nameMatch =
      item.leadName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.phone?.includes(filters.search);

    const statusMatch = filters.status ? item.status === filters.status : true;
    const outcomeMatch = filters.outcome
  ? item.outcome === filters.outcome
  : true;

    const dateMatch = filters.date
      ? new Date(item.createdAt).toLocaleDateString() ===
        new Date(filters.date).toLocaleDateString()
      : true;

    return nameMatch && statusMatch && outcomeMatch && dateMatch;
  });

  // ================= UI =================
  return (
    <div className="call-history-page">
      <h2 className="page-title">Call History</h2>

      {/* FILTERS */}
      <div className="lead-filters">
        <input
          placeholder="Search by name or phone..."
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
        />

        <input
          type="date"
          value={filters.date}
          onChange={e => setFilters({ ...filters, date: e.target.value })}
        />

        <select
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
          <option>Won</option>
          <option>Scheduled</option>
        </select>
        {/* ⭐ Outcome Filter */}
<select
  className="outcome-filter"
  value={filters.outcome}
  onChange={e => setFilters({ ...filters, outcome: e.target.value })}
>
  <option value="">All Outcome</option>
  <option>Completed</option>
  <option>Missed</option>
  <option>Cancel</option>
  <option>Wrong No</option>
  <option>Switch Off</option>
</select>
      </div>

      {/* HISTORY LIST */}
     <div className="card call-history-table">

        {/* ⭐ UPDATED: added Action column */}
     <div className="call-history-row table-header">
  <div>Lead</div>
  <div>Phone</div>
  <div>Type</div>
  <div>Status</div>
  <div>Outcome</div>
  <div>Notes</div>
  <div>Date</div>
  <div>Action</div>
</div>


        {loading ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            Loading history...
          </div>
        ) : filteredHistory.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No call history found
          </div>
        ) : (
          filteredHistory.map(item => (
            <div key={item._id} className="call-history-row">


             <div className="cell">
  <span className="cell-label">Lead</span>
  <strong>{item.leadName}</strong>
</div>


             <div className="cell">
  <span className="cell-label">Phone</span>
  {item.phone}
</div>

<div className="cell">
  <span className="cell-label">Type</span>
  {item.callType || "—"}
</div>


              <div className="cell">
  <span className="cell-label">Status</span>
  <span
    className={`status-badge ${item.status
      ?.toLowerCase()
      .replace(" ", "-")}`}
  >
    {item.status}
  </span>
</div>

<div className="cell">
  <span className="cell-label">Outcome</span>
  {item.outcome || "—"}
</div>

<div className="cell">
  <span className="cell-label">Notes</span>
  {item.notes || "—"}
</div>

<div className="cell">
  <span className="cell-label">Date</span>
  {new Date(item.createdAt).toLocaleString()}
</div>


            

              {/* ⭐ UPDATED: call button per row */}
             <div className="cell">
  <span className="cell-label">Action</span>
  <button
    className="call-btn"
    onClick={() => {
      setManualCallLead({
        name: item.leadName,
        phone: item.phone,
        leadId: item.leadId
      });
      setShowCallTypeModal(true);
    }}
  >
    📞 Call
  </button>
</div>

            </div>
          ))
        )}
      </div>

      {/* ⭐ UPDATED: Call Type Modal (same as Leads.jsx) */}
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

            <button
              className="secondary-btn"
              onClick={() => setShowCallTypeModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ⭐ UPDATED: Call Result Modal */}
      {showOutcomeModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: "center" }}>
            <h3>Call Result</h3>

            <select
              className="form-control"
              value={callStatus}
              onChange={e => setCallStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
              <option>Won</option>
              <option>Scheduled</option>
            </select>

            <select
              className="form-control"
              value={outcome}
              onChange={e => setOutcome(e.target.value)}
            >
              <option value="">Select Outcome</option>
              <option>Completed</option>
              <option>Missed</option>
              <option>Cancel</option>
              <option>Wrong No</option>
              <option>Switch Off</option>
            </select>

            <textarea
              className="form-control"
              placeholder="Notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px"
              }}
            >
              {/* ⭐ UPDATED: save call result to history */}
              <button
                className="primary-btn"
                onClick={async () => {
                  if (!callStatus) return alert("Select status");

                  await fetch(`${import.meta.env.VITE_API_URL}/api/call-history`, {
                    
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                       leadId: selectedLead.leadId, 
                      leadName: selectedLead.name,
                      phone: selectedLead.phone,
                      callType,
                      status: callStatus,
                      outcome,
                      notes,
                      dashboardId
                    })
                  });
if (selectedLead.leadId) {
  await api.put(`/api/leads/${selectedLead.leadId}`, {
    status: callStatus
  });
}


                  setShowOutcomeModal(false);
                  setCallStatus("");
                  setOutcome("");
                  setNotes("");
                  fetchHistory(); // ⭐ UPDATED refresh
                }}
              >
                Save
              </button>
<button
  className="schedule-btn"
  onClick={saveAndOpenSchedule}
>
  📅 Schedule
</button>

              <button
                className="secondary-btn"
                onClick={() => setShowOutcomeModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
        <button
          className="save-btn"
          onClick={async () => {
            if (!scheduledAt) {
              alert("Select date & time");
              return;
            }

            try {
              const isoDate = new Date(scheduledAt).toISOString();

              await fetch(
                `${import.meta.env.VITE_API_URL}/api/leads/${selectedLead.leadId}/schedule-call`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ scheduledAt: isoDate }),
                }
              );

              alert("Call scheduled!");
              setShowScheduleModal(false);
              setScheduledAt("");
              fetchHistory(); // refresh
            } catch {
              alert("Failed to schedule call");
            }
          }}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowScheduleModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CallHistory;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/leads.css";

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

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
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

  // ================= FILTERS =================
  const filteredHistory = history.filter(item => {
    const nameMatch =
      item.leadName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.phone?.includes(filters.search);

    const statusMatch = filters.status ? item.status === filters.status : true;

    const dateMatch = filters.date
      ? new Date(item.createdAt).toLocaleDateString() ===
        new Date(filters.date).toLocaleDateString()
      : true;

    return nameMatch && statusMatch && dateMatch;
  });

  // ================= UI =================
  return (
    <div className="leads-page">
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
          <option>Completed</option>
          <option>Missed</option>
          <option>Busy</option>
          <option>No Answer</option>
        </select>
      </div>

      {/* HISTORY LIST */}
      <div className="card">
        {/* ⭐ UPDATED: added Action column */}
        <div
          className="lead-row"
          style={{
            fontWeight: "bold",
            borderBottom: "2px solid rgba(255,255,255,0.1)"
          }}
        >
          <div className="lead-cell">Lead Details</div>
          <div>Phone</div>
          <div>Type</div>
          <div>Status</div>
          <div>Outcome</div>
          <div>Notes</div>
          <div>Date</div>
          <div>Action</div> {/* ⭐ UPDATED */}
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
            <div key={item._id} className="lead-row">
              <div className="lead-cell lead-name">
                <div>{item.leadName}</div>
              </div>

              <div>{item.phone}</div>

              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                {item.callType || "—"}
              </div>

              <div
                className={`status-badge ${item.status
                  ?.toLowerCase()
                  .replace(" ", "-")}`}
              >
                {item.status}
              </div>

              <div style={{ fontSize: "13px" }}>
                {item.outcome || "—"}
              </div>

              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                {item.notes || "—"}
              </div>

              {/* DATE */}
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                {new Date(item.createdAt).toLocaleString()}
              </div>

              {/* ⭐ UPDATED: call button per row */}
              <div>
                <button
                  className="call-btn"
                  onClick={() => {
                    setManualCallLead({
                      name: item.leadName,
                      phone: item.phone,
                      _id: item._id
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
                      leadName: selectedLead.name,
                      phone: selectedLead.phone,
                      callType,
                      status: callStatus,
                      outcome,
                      notes,
                      dashboardId
                    })
                  });

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
                className="secondary-btn"
                onClick={() => setShowOutcomeModal(false)}
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

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
const [showCallTypeModal, setShowCallTypeModal] = useState(false);
const [manualCallLead, setManualCallLead] = useState(null);
const [showExotelModal, setShowExotelModal] = useState(false);
const [isExotelConnected, setIsExotelConnected] = useState(false);
const [showOutcomeModal, setShowOutcomeModal] = useState(false);
const [callStatus, setCallStatus] = useState("");
const [outcome, setOutcome] = useState("");
const [notes, setNotes] = useState("");
const [callType, setCallType] = useState(null);
const [selectedLead, setSelectedLead] = useState(null);

const [exotelSid, setExotelSid] = useState("");
const [exotelApiKey, setExotelApiKey] = useState("");
const [exotelToken, setExotelToken] = useState("");
const [callerId, setCallerId] = useState("");
const [searchName, setSearchName] = useState("");
const [filterStatus, setFilterStatus] = useState("");
const [filterDate, setFilterDate] = useState("");
const [showScheduleModal, setShowScheduleModal] = useState(false);
const [scheduledAt, setScheduledAt] = useState("");

// Upcoming calls → nearest first
const activeCalls = scheduledCalls
  .filter(c => c.status === "Scheduled")
  .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

// History → latest first
// History → latest first (fixed)
const historyCalls = scheduledCalls
  .filter(c => c.status !== "Scheduled")
  .sort((a, b) => {
    const timeA = new Date(a.updatedAt || a.createdAt || a.scheduledAt).getTime();
    const timeB = new Date(b.updatedAt || b.createdAt || b.scheduledAt).getTime();
    return timeB - timeA; // latest completed call first
  });


const applyFilters = (calls) => {
  return calls.filter(call => {
    const nameMatch = call.leadId?.name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());

    const statusMatch = filterStatus
      ? call.status === filterStatus
      : true;

    const dateMatch = filterDate
      ? new Date(call.scheduledAt).toDateString() ===
        new Date(filterDate).toDateString()
      : true;

    return nameMatch && statusMatch && dateMatch;
  });
};

const filteredActiveCalls = applyFilters(activeCalls);
const filteredHistoryCalls = applyFilters(historyCalls);


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
const startCalling = async (type) => {
  setShowCallTypeModal(false);

  if (!manualCallLead) return;

  const call = manualCallLead;
  setCallType(type);

  if (!call.phone) {
    alert("No phone number");
    return;
  }

  //  SIM CALL
  if (type === "SIM") {
    window.open(`tel:${call.phone}`);
  }

  // ☁️ CLOUD CALL
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: call.phone }),
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

  // ⭐ SAME BEHAVIOUR AS LEADS.JSX
  setTimeout(() => {
    setSelectedLead(call);
    setShowOutcomeModal(true);
  }, 1500);

  setManualCallLead(null);
};
const saveCallResult = async () => {
  if (!callStatus) {
    alert("Please select call status");
    return;
  }

  try {
    console.log("SelectedLead:", selectedLead);

    const leadId =
      typeof selectedLead.leadId === "object"
        ? selectedLead.leadId._id
        : selectedLead.leadId; // handle string or object

    // 1️⃣ Save call history
    await fetch(`${import.meta.env.VITE_API_URL}/api/call-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
     body: JSON.stringify({
  leadId: leadId, // ⭐ ADD THIS (MOST IMPORTANT)
  leadName:
    typeof selectedLead.leadId === "object"
      ? selectedLead.leadId.name
      : "Lead",
  phone: selectedLead.phone,
  callType,
  status: callStatus,
  outcome,
  notes,
  dashboardId: id,
}),

    });

    // 2️⃣ Update lead status (FIXED)
    if (leadId) {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/leads/${leadId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: callStatus }),
        }
      );
    }

    // 3️⃣ Update scheduled call status
    let newStatus = "Completed";
    if (["Lost", "New"].includes(callStatus)) {
      newStatus = "Missed";
    }

    await updateCallStatus(selectedLead._id, newStatus);

    // 4️⃣ Reset + refresh
    setShowOutcomeModal(false);
    setCallStatus("");
    setOutcome("");
    setNotes("");
    loadScheduledCalls();

  } catch (err) {
    console.error(err);
    alert("Failed to save call result");
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


             <div
  className="card clickable"
  onClick={() => navigate(`/dashboard/${id}/analytics`)}
>
  <h3>Analytics</h3>
  <p>View performance & insights</p>
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

              <div
                className="card clickable"
                onClick={() => navigate(`/dashboard/${id}/history`)}
              >
                <h3>History</h3>
                <p>View all call logs</p>
              </div>
            </div>
          </>
        )}
       {showCallsModal && (
  <div className="modal-overlay">
    <div className="modal-box large">

      {/* HEADER */}
      <div className="modal-header">
        <h2>{showHistory ? " Call History" : " Scheduled Calls"}</h2>

       <div className="modal-header-buttons">

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
{/* 🔎 FILTER BAR START */}
<div className="call-filters">
  {/* 🔍 Name Search */}
  <input
    type="text"
    placeholder="Search by name..."
    value={searchName}
    onChange={(e) => setSearchName(e.target.value)}
  />

  {/* 📅 Date Filter */}
  <input
    type="date"
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
  />

  {/* 📊 Status Filter → ONLY in History */}
 
</div>

{/* 🔎 FILTER BAR END */}
      {/* EMPTY MESSAGE */}
      {(showHistory ? filteredHistoryCalls : filteredActiveCalls).length === 0
 && (
        <p className="empty-text">
          No {showHistory ? "history" : "scheduled"} calls
        </p>
      )}

      {/* CALL LIST */}
      {(showHistory ? filteredHistoryCalls : filteredActiveCalls).map(call => (

        <div key={call._id} className="call-row">
  <div>
    <strong>{call.leadId?.name}</strong><br />
    {call.phone}<br />
    {new Date(call.scheduledAt).toLocaleString()}
  </div>


        <div className="call-actions">
  {!showHistory && (
    <>
      
    </>
  )}

  {/* 📞 Available in BOTH Scheduled & History */}
  <button
    className="call-now-btn"
    onClick={() => {
      setManualCallLead(call);
      setShowCallTypeModal(true);
    }}
  >
    📞 Call
  </button>
</div>

        </div>
      ))}

    </div>
  </div>
)}

{showCallTypeModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Select Calling Method</h3>

      <button className="call-type-btn" onClick={() => startCalling("SIM")}>
         SIM Based (Free)
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
{showExotelModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Connect Exotel</h3>

      <input placeholder="Exotel SID" value={exotelSid} onChange={e => setExotelSid(e.target.value)} />
      <input placeholder="Exotel API Key" value={exotelApiKey} onChange={e => setExotelApiKey(e.target.value)} />
      <input placeholder="Exotel Auth Token" value={exotelToken} onChange={e => setExotelToken(e.target.value)} />
      <input placeholder="Caller ID" value={callerId} onChange={e => setCallerId(e.target.value)} />

      <button onClick={() => setShowExotelModal(false)}>Cancel</button>
    </div>
  </div>
)}
{showOutcomeModal && (
  <div className="modal-overlay">
    <div
      className="modal-box"
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h3>Call Result</h3>

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
        <option>Scheduled</option>
      </select>

      {/* 🔥 IMPORTANT: Outcome DROPDOWN (same as Leads.jsx) */}
      <select
        className="form-control"
        style={{ width: "80%", margin: "0 auto 12px auto" }}
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
        style={{ width: "80%", minHeight: "80px", margin: "0 auto 12px auto" }}
        placeholder="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
          marginTop: "10px"
        }}
      >
        <button className="primary-btn" onClick={saveCallResult}>
          Save
        </button>

       <button
  className="schedule-btn"
  onClick={async () => {
    if (!callStatus) {
      alert("Please select call status");
      return;
    }

    try {
      const leadId =
        typeof selectedLead.leadId === "object"
          ? selectedLead.leadId._id
          : selectedLead.leadId;

      // 1️⃣ Save call history
      
      await fetch(`${import.meta.env.VITE_API_URL}/api/call-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body: JSON.stringify({
  leadId: leadId,   // ⭐ ADD THIS LINE
  leadName:
    typeof selectedLead.leadId === "object"
      ? selectedLead.leadId.name
      : "Lead",
  phone: selectedLead.phone,
  callType,
  status: callStatus,
  outcome,
  notes,
  dashboardId: id,
}),

      });

      // 2️⃣ Update lead status
      if (leadId) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/leads/${leadId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: callStatus }),
          }
        );
      }

      // 3️⃣ Update scheduled call status
      let newStatus = "Completed";
      if (["Lost", "New"].includes(callStatus)) {
        newStatus = "Missed";
      }
      await updateCallStatus(selectedLead._id, newStatus);

      // 4️⃣ Close result modal & open schedule modal
      setShowOutcomeModal(false);
      setShowScheduleModal(true);

    } catch (err) {
      console.error(err);
      alert("Failed to save call result before scheduling");
    }
  }}
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

      <p><strong>Lead:</strong> {selectedLead?.leadId?.name}</p>
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
                `${import.meta.env.VITE_API_URL}/api/leads/${selectedLead.leadId._id}/schedule-call`,
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
              loadScheduledCalls(); // refresh list
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

      </main>
    </div>
  );
}

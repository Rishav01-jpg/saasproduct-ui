import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import logo from "../assets/logo2.png";

export default function AboutRingRing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isTokenValid()) {
      navigate("/dashboard");
    } else {
      navigate("/plans");
    }
  };

  return (
    <>
  <Helmet>
    <title>About Ring Ring CRM</title>
    <meta name="description" content="About Ring Ring CRM - auto calling CRM for managing leads, calls, and sales efficiently." />
    <link rel="canonical" href="https://ringringcrm.com/about" />
  </Helmet>
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Top Navigation Buttons */}
        <div style={styles.topBar}>
          <button style={styles.navBtn} onClick={() => navigate("/")}>
            Home
          </button>
          <button style={styles.navBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={styles.navBtn} onClick={() => navigate("/signup")}>
            Signup
          </button>
          <button style={styles.getStarted} onClick={handleGetStarted}>
            Pricing
          </button>
        </div>

        <img src={logo} alt="Ring Ring CRM" style={styles.logo} />

        <h1 style={styles.title}>What is Ring Ring CRM?</h1>

        <p style={styles.description}>
          Ring Ring CRM is a powerful lead management and automatic calling
          platform designed to help businesses streamline their sales process,
          manage contacts efficiently, and increase conversions. The system
          allows users to import leads through CSV files, automatically call
          contacts one by one, track call outcomes, schedule follow-ups, and
          analyze performance through a smart dashboard.
          <br /><br />
          With Ring Ring CRM, businesses can talk to clients, research leads,
          save notes, schedule meetings, set follow-ups, and track the complete
          communication history with every client. Instead of using multiple
          tools for calling, lead tracking, and scheduling, everything can be
          managed in one place.
          <br /><br />
          The platform is especially useful for sales teams, agencies,
          telecallers, startups, and businesses that handle large numbers of
          leads and daily client calls. It helps teams stay organized, improve
          communication, and close more deals.
          <br /><br />
          The goal of Ring Ring CRM is simple — organize leads, talk to more
          clients, schedule meetings, track progress, and convert more leads
          into customers.
        </p>

        <div style={styles.quote}>
          Manage Leads. Talk to Clients. Schedule Meetings. Close More Deals.
        </div>

        <div style={styles.features}>
          <div style={styles.card}>
            <h3>Auto Calling</h3>
            <p>Automatically call leads one by one and track call results.</p>
          </div>

          <div style={styles.card}>
            <h3>Client Communication</h3>
            <p>Talk to clients, save notes, and track conversation history.</p>
          </div>

          <div style={styles.card}>
            <h3>Lead Research</h3>
            <p>Research leads and store important information and notes.</p>
          </div>

          <div style={styles.card}>
            <h3>Meeting Scheduling</h3>
            <p>Schedule meetings and follow-ups with your clients.</p>
          </div>

          <div style={styles.card}>
            <h3>CSV Import & Export</h3>
            <p>Upload and download contacts easily using CSV files.</p>
          </div>

          <div style={styles.card}>
            <h3>Analytics Dashboard</h3>
            <p>Track calls, conversions, and team performance.</p>
          </div>
        </div>

      </div>
    </div>
</>
  );
}

const styles = {
 page: {
  minHeight: "100vh",
  overflowX: "hidden",
  background:
    'linear-gradient(rgba(11, 1, 32, 0.88), rgba(20, 5, 45, 0.92)), url("https://res.cloudinary.com/djatdycpx/image/upload/v1768206860/6012933_hehrvn.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px"
},
  container: {
    maxWidth: "1000px",
    width: "100%",
    textAlign: "center",
    color: "white"
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  navBtn: {
    padding: "8px 14px",
    background: "transparent",
    border: "1px solid #ec4899",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },
  getStarted: {
    padding: "8px 16px",
    background: "#ec4899",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },
  logo: {
    width: "220px",
    marginBottom: "25px"
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px"
  },
  description: {
    fontSize: "17px",
    lineHeight: "1.8",
    marginBottom: "25px",
    padding: "0 15px"
  },
  quote: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "35px",
    color: "#ec4899"
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px"
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "22px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)"
  }
};
import React from 'react';
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import logo from "../assets/logo.png";
import howitworks from "../assets/howitworks.png";
import { Helmet } from "react-helmet-async";

export default function BestTelecallingCRM() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isTokenValid()) {
      navigate("/dashboard");
    } else {
      navigate("/plans");
    }
  };

  const handleBookDemo = () => {
    navigate("/book-demo");
  };

  return (
    <div className="landing">
      <Helmet>
        <title>Best Telecalling CRM for Small Business in India | Auto Calling CRM</title>
        <meta name="description" content="Discover the best telecalling CRM for small business in India. Our auto calling CRM helps you call leads automatically, track performance, and grow sales. Start now!" />
        <meta name="keywords" content="telecalling CRM for small business, auto calling CRM, call leads automatically, best CRM for telecalling, CRM for sales teams" />
        <link rel="canonical" href="https://ringringcrm.com/best-telecalling-crm-for-small-business" />
      </Helmet>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
          background-color: #0b0120;
        }

        .landing {
          min-height: 100vh;
          overflow-x: hidden;
          background: linear-gradient(rgba(11, 1, 32, 0.88), rgba(20, 5, 45, 0.92)),
            url("https://res.cloudinary.com/djatdycpx/image/upload/v1768206860/6012933_hehrvn.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: #fff;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        /* NAVBAR */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 8%;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 22px;
          font-weight: 700;
          cursor: pointer;
        }

        .logo-img {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-links button {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .nav-links button:hover {
          transform: scale(1.05);
        }

        /* HERO SECTION */
        .hero {
          padding: 80px 8% 40px;
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: clamp(32px, 7vw, 64px);
          line-height: 1.1;
          margin-bottom: 24px;
          font-weight: 800;
        }

        .hero span {
          background: linear-gradient(135deg, #a78bfa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: clamp(18px, 3vw, 22px);
          color: #cbd5e1;
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          padding: 16px 32px;
          border-radius: 12px;
          border: none;
          color: white;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(124, 58, 237, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 16px 32px;
          border-radius: 12px;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* INTRO SECTION */
        .intro {
          padding: 100px 8%;
          background: rgba(0, 0, 0, 0.2);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: clamp(28px, 5vw, 42px);
          margin-bottom: 16px;
        }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .problem-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .problem-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .problem-card h3 {
          font-size: 24px;
          margin-bottom: 16px;
          color: #fca5a5;
        }

        .problem-card p {
          color: #94a3b8;
          line-height: 1.6;
        }

        /* FEATURE SECTION */
        .features {
          padding: 100px 8%;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 32px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: #7c3aed;
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .feature-card h3 {
          margin-bottom: 12px;
          font-size: 22px;
        }

        .feature-card p {
          color: #94a3b8;
          line-height: 1.6;
        }

        /* COMPARISON SECTION */
        .comparison {
          padding: 100px 8%;
          background: rgba(0, 0, 0, 0.3);
        }

        .table-container {
          overflow-x: auto;
          margin-top: 40px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(15, 23, 42, 0.5);
          min-width: 600px;
        }

        th, td {
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        th {
          background: rgba(30, 41, 59, 0.8);
          font-weight: 700;
          color: #fff;
        }

        .highlight-col {
          background: rgba(124, 58, 237, 0.1);
          color: #a78bfa;
          font-weight: 700;
        }

        .check { color: #10b981; font-weight: bold; }
        .cross { color: #ef4444; font-weight: bold; }

        /* HOW IT WORKS */
        .how-it-works {
          padding: 100px 8%;
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 60px;
          max-width: 800px;
          margin: 0 auto;
        }

        .step {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .step-num {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }

        .step-content h3 {
          margin-bottom: 8px;
          font-size: 22px;
        }

        .step-content p {
          color: #94a3b8;
        }

        /* CTA SECTION */
        .cta-bottom {
          padding: 100px 8%;
          text-align: center;
        }

        .cta-card {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(236, 72, 153, 0.2));
          padding: 80px 40px;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
        }

        .cta-card h2 {
          font-size: clamp(24px, 5vw, 48px);
          margin-bottom: 30px;
        }

        /* WHATSAPP BUTTON */
        .whatsapp-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #25d366;
          color: white;
          padding: 12px 24px;
          border-radius: 50px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
          z-index: 1000;
          transition: transform 0.3s ease;
        }

        .whatsapp-btn:hover {
          transform: scale(1.05);
        }

        /* MOBILE RESPONSIVENESS */
        @media (max-width: 768px) {
          .navbar {
            padding: 15px 5%;
          }
          .hero {
            padding: 60px 5% 30px;
          }
          .intro, .features, .comparison, .how-it-works, .cta-bottom {
            padding: 60px 5%;
          }
          .step {
            flex-direction: column;
            gap: 15px;
          }
          .whatsapp-btn {
            bottom: 20px;
            right: 20px;
            padding: 10px 18px;
            font-size: 14px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="RingRing CRM Logo" className="logo-img" />
          <span>RingRing CRM</span>
        </div>
        <div className="nav-links">
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <h1><span>Best Telecalling CRM</span> for Small Business in India</h1>
        <p>Tired of manual dialing? Use the most powerful <strong>auto calling CRM</strong> to reach more leads, track every conversation, and close deals faster.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleGetStarted}>Start Calling Now</button>
          <button className="btn-secondary" onClick={handleBookDemo}>Book Demo</button>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="intro">
        <div className="section-header">
          <h2>Why Manual Calling is Killing Your Growth</h2>
          <p>Running a small business is hard. Don't let manual processes slow you down.</p>
        </div>
        <div className="problem-grid">
          <div className="problem-card">
            <h3>Manual Calling is Slow</h3>
            <p>Your team spends 60% of their time just dialing numbers. With an <strong>auto calling CRM</strong>, you eliminate the wait.</p>
          </div>
          <div className="problem-card">
            <h3>Hard to Manage Leads</h3>
            <p>Leads in Excel sheets get lost. Our <strong>telecalling CRM for small business</strong> keeps everything organized in one place.</p>
          </div>
          <div className="problem-card">
            <h3>Missed Follow-ups</h3>
            <p>Forgetting to call back a hot lead? Our system reminds you exactly when to <strong>call leads automatically</strong>.</p>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="features">
        <div className="section-header">
          <h2>Powerful Features to Scale Your Sales</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Automatic Calling</h3>
            <p>Just click "Start" and move from one call to the next seamlessly. No more manual entry.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>CSV Upload</h3>
            <p>Import thousands of contacts in seconds. Bulk upload support for all your lead sources.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Contact Management</h3>
            <p>A simple, intuitive interface to manage all your prospects and their history.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Call Tracking</h3>
            <p>Detailed analytics on call duration, success rates, and team performance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Works on Android</h3>
            <p>Turn any Android phone into a powerful calling machine with our mobile-friendly interface.</p>
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="comparison">
        <div className="section-header">
          <h2>RingRing CRM vs Others</h2>
          <p>See why we are the preferred choice for small businesses in India.</p>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th className="highlight-col">RingRing CRM</th>
                <th>TeleCRM</th>
                <th>LeadSquared</th>
                <th>Neodove</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Auto Calling</td>
                <td className="highlight-col"><span className="check">✔</span> Yes</td>
                <td><span className="check">✔</span> Yes</td>
                <td><span className="check">✔</span> Yes</td>
                <td><span className="check">✔</span> Yes</td>
              </tr>
              <tr>
                <td>Ease of Use</td>
                <td className="highlight-col">High (Self-Serve)</td>
                <td>Medium</td>
                <td>Low (Complex)</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>Price for Small Biz</td>
                <td className="highlight-col">Affordable</td>
                <td>Expensive</td>
                <td>Very High</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Android Support</td>
                <td className="highlight-col"><span className="check">✔</span> Native</td>
                <td><span className="check">✔</span> Yes</td>
                <td><span className="check">✔</span> Yes</td>
                <td><span className="check">✔</span> Yes</td>
              </tr>
              <tr>
                <td>Setup Time</td>
                <td className="highlight-col">2 Minutes</td>
                <td>Days</td>
                <td>Weeks</td>
                <td>Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>Start Calling in 4 Simple Steps</h2>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-content">
              <h3>Upload Contacts</h3>
              <p>Upload your lead list via CSV or add them manually to the system.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-content">
              <h3>Click Next</h3>
              <p>Navigate to the calling screen and click the "Next" button to begin your session.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-content">
              <h3>Call Automatically</h3>
              <p>The system initiates the call. No need to type numbers or switch apps.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <div className="step-content">
              <h3>Save Results</h3>
              <p>Mark the call status, add notes, and move to the next lead instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-bottom">
        <div className="cta-card">
          <h2>Start calling your contacts in seconds</h2>
          <button className="btn-primary" onClick={handleGetStarted}>Start Calling Now</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "40px 8%",
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        color: "#64748b",
        fontSize: "14px"
      }}>
        <p>© {new Date().getFullYear()} RingRing CRM. All rights reserved.</p>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <a href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</a>
          <a href="/plans" style={{ color: "#94a3b8", textDecoration: "none" }}>Pricing</a>
          <a href="/login" style={{ color: "#94a3b8", textDecoration: "none" }}>Login</a>
          <a href="/signup" style={{ color: "#94a3b8", textDecoration: "none" }}>Signup</a>
        </div>
      </footer>

      {/* WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/918298171197?text=Hi%20RingRing%20CRM%20Team,%20I'm%20interested%20in%20your%20telecalling%20CRM." 
        className="whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}

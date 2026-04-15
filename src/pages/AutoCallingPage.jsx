import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet-async";

export default function AutoCallingPage() {
  const navigate = useNavigate();

  // Set page title for SEO
 

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
  <>
    <Helmet>
      <title>CRM with Automatic Calling | Auto Dialer CRM India</title>
      <meta name="description" content="CRM with automatic calling to boost sales. Auto dial leads, track calls, and improve conversions with Ring Ring CRM." />
      <link rel="canonical" href="https://ringringcrm.com/crm-with-automatic-calling" />
    </Helmet>

    <div className="autocalling-page">
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #7c3aed, #ec4899);
          --accent-glow: rgba(124, 58, 237, 0.15);
          --bg-dark: #0b0120;
          --bg-card: rgba(255, 255, 255, 0.05);
          --text-main: #ffffff;
          --text-muted: #bbb;
        }

        img {
           max-width: 100%;
           height: auto;
           background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(236, 72, 153, 0.2)); /* Enhanced Fallback */
         }

        .autocalling-page {
          min-height: 100vh;
          background: linear-gradient(rgba(11, 1, 32, 0.96), rgba(20, 5, 45, 0.98)),
                      url("https://res.cloudinary.com/djatdycpx/image/upload/v1768206860/6012933_hehrvn.jpg");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: var(--text-main);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          overflow-x: hidden;
        }

        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 5%;
          backdrop-filter: blur(15px);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(11, 1, 32, 0.8);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.4rem;
          font-weight: 800;
          cursor: pointer;
        }

        .logo-img {
          height: 36px;
          width: auto;
        }

        .nav-cta {
          background: var(--primary-gradient);
          padding: 8px 20px;
          border-radius: 50px;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .btn-book-demo {
          background: transparent;
          border: 1px solid #ec4899;
          color: #ec4899;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          margin-right: 10px;
          transition: all 0.3s ease;
        }

        .btn-book-demo:hover {
          background: rgba(236, 72, 153, 0.1);
        }

        .nav-actions {
          display: flex;
          align-items: center;
        }

        /* Hero / Introduction */
        .hero {
          padding: 80px 5% 40px;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero h1 {
          font-size: clamp(2.2rem, 7vw, 4rem);
          line-height: 1.1;
          margin-bottom: 24px;
          font-weight: 900;
          letter-spacing: -1.5px;
        }

        .hero h1 span {
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 30px;
        }

        /* Content Sections */
        .section-padding {
          padding: 60px 5%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-title {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          margin-bottom: 40px;
          font-weight: 800;
          text-align: center;
        }

        /* Grid Layouts */
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .card {
          background: var(--bg-card);
          padding: 35px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-5px);
          border-color: rgba(124, 58, 237, 0.3);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .card h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #7c3aed;
        }

        .list-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
          color: var(--text-muted);
        }

        .check-icon {
          color: #10b981;
          font-weight: bold;
        }

        /* Step Indicator */
        .step-card {
          position: relative;
          padding-left: 60px;
        }

        .step-number {
          position: absolute;
          left: 0;
          top: 30px;
          width: 40px;
          height: 40px;
          background: var(--primary-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
        }

        /* Stats / Benefits */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .benefit-item {
          text-align: center;
          padding: 30px;
          background: linear-gradient(180deg, rgba(124, 58, 237, 0.1), transparent);
          border-radius: 20px;
        }

        .benefit-item h4 {
          font-size: 1.1rem;
          font-weight: 700;
        }

        /* Audience Tags */
        .audience-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
        }

        .audience-tag {
          background: rgba(255, 255, 255, 0.05);
          padding: 12px 25px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 600;
          color: #ec4899;
        }

        /* Final CTA */
        .final-cta {
          padding: 100px 5%;
          text-align: center;
          background: radial-gradient(circle at center, var(--accent-glow), transparent 70%);
        }

        .btn-large {
          background: var(--primary-gradient);
          padding: 18px 45px;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: 800;
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 15px 35px rgba(124, 58, 237, 0.4);
          transition: transform 0.2s;
        }

        .btn-large:hover {
          transform: scale(1.05);
        }

        footer {
          padding: 40px 5%;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #666;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .hero { padding: 60px 5% 30px; }
          .section-padding { padding: 40px 5%; }
          .card { padding: 25px; }
          .navbar { padding: 10px 3%; }
          .logo span { font-size: 1.1rem; }
          .btn-book-demo { display: none; } /* Hide on mobile navbar to save space */
        }
          .whatsapp-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 999;
}

/* BIG BUTTON */
.whatsapp-main {
  background: #25D366;
  color: white;
  padding: 14px 28px;
  border-radius: 40px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  transition: transform 0.2s ease;
}

.whatsapp-main:hover {
  transform: scale(1.05);
}

/* ROUND BUTTON */
.whatsapp-icon {
  background: #25D366;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
  .whatsapp-icon {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
      `}</style>

      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="RingRing" className="logo-img" />
          <span>RingRing CRM</span>
        </div>
        <div className="nav-actions">
          <button className="btn-book-demo" onClick={() => navigate("/book-demo")}>Book Demo</button>
          <button className="nav-cta" onClick={() => navigate("/plans")}>Get Started</button>
        </div>
      </nav>

      <main>
        {/* Section 1: Introduction */}
        <section className="hero">
          <motion.div {...fadeIn}>
            <h1 className="h1-heading">
              <span>CRM with Automatic Calling</span> for Faster Sales
            </h1>
            <p>
              Managing sales calls manually is slow and inefficient. Our CRM with automatic calling 
              helps you connect with contacts instantly without dialing numbers manually.
            </p>
            <p style={{ color: '#fff', fontWeight: '600' }}>
              With just one click, you can call the next contact, save time, and increase your team's productivity.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
              <button className="btn-large" onClick={() => navigate("/plans")}>Get Started</button>
              <button className="btn-book-demo" style={{ padding: '15px 35px', fontSize: '1.1rem' }} onClick={() => navigate("/book-demo")}>Book Demo</button>
            </div>
          </motion.div>
        </section>

        {/* Visual Break */}
        <motion.div 
          className="section-padding"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            borderRadius: '24px', 
            overflow: 'hidden', 
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="https://res.cloudinary.com/djatdycpx/image/upload/q_auto/f_auto/v1775720583/Gemini_Generated_Image_cnpfa9cnpfa9cnpf_xuvgp2.jpg" 
              alt="CRM Auto Dialer Interface" 
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Section 2: Features */}
        <section className="section-padding">
          <h2 className="section-title">Powerful <span>Auto Dialer</span> Features</h2>
          <div className="grid-container">
            <motion.div className="card" {...fadeIn}>
              <div className="list-item"><span className="check-icon">✔</span> Automatic calling from CRM</div>
              <div className="list-item"><span className="check-icon">✔</span> Call next contact with one click</div>
              <div className="list-item"><span className="check-icon">✔</span> CSV import and auto calling</div>
              <div className="list-item"><span className="check-icon">✔</span> Track call history and outcomes</div>
              <div className="list-item"><span className="check-icon">✔</span> Works with Android calling</div>
              <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888' }}>
                Our auto dialer CRM is built for modern sales teams who want speed and efficiency.
              </p>
            </motion.div>
            
            <motion.div className="card" {...fadeIn} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: '300px', background: 'rgba(255,255,255,0.05)' }}>
                   <img 
                    src="https://res.cloudinary.com/djatdycpx/image/upload/q_auto/f_auto/v1775664968/workaholics-businesspeople-brainstorming-financial-company-ideas-analyzing-strategy-paperwork-late-night-business-office-meeting-room_pijjn0.jpg" 
                    alt="Efficiency" 
                    style={{ width: '100%', height: '100%', borderRadius: '15px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </motion.div>
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section className="section-padding" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <h2 className="section-title">How It Works</h2>
          <div className="grid-container">
            {[
              { step: "1", title: "Upload contacts", text: "Upload your contacts using CSV file in seconds." },
              { step: "2", title: "Start Calling", text: "Simply click on 'Start Calling' to begin your session." },
              { step: "3", title: "Auto Dial", text: "The system automatically dials the next contact for you." },
              { step: "4", title: "Save & Move", text: "Save call outcomes and move forward instantly." }
            ].map((item, index) => (
              <motion.div key={index} className="card step-card" {...fadeIn}>
                <div className="step-number">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '40px', fontWeight: '700', fontSize: '1.2rem', color: '#ec4899' }}>
            No manual dialing. No wasted time.
          </p>
        </section>

        {/* Section 4: Benefits */}
        <section className="section-padding">
          <h2 className="section-title">Why Choose Our <span>CRM with Auto Dialer</span>?</h2>
          <div className="benefits-grid">
            <motion.div className="benefit-item" {...fadeIn}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📈</div>
              <h4>Increase call volume</h4>
            </motion.div>
            <motion.div className="benefit-item" {...fadeIn}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏱️</div>
              <h4>Save time on manual dialing</h4>
            </motion.div>
            <motion.div className="benefit-item" {...fadeIn}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎯</div>
              <h4>Improve sales conversion</h4>
            </motion.div>
            <motion.div className="benefit-item" {...fadeIn}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🗃️</div>
              <h4>Organize all contacts in one place</h4>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Who Is It For */}
        <section className="section-padding" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Who Is It For?</h2>
          <div className="audience-container">
            {["Sales teams", "Telecallers", "Startups", "Real estate agents", "Marketing agencies","Insurance Brokers","EdTech & Training","SaaS Startups","Logistics & Delivery","Healthcare Clinics","Banking & Fintech","Small Call Centers","Collections Agencies","Solopreneurs","Sales Managers","Retail/Services",].map((item, index) => (
              <motion.div key={index} className="audience-tag" {...fadeIn}>
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 6: CTA */}
        <section className="final-cta">
          <motion.div {...fadeIn}>
            <h2 className="section-title">Ready to Boost Your Sales?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 40px', color: '#bbb' }}>
              Start using our CRM with automatic calling today and grow your sales faster.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-large" onClick={() => navigate("/plans")}>
                 Get Started Now
              </button>
              <button className="btn-book-demo" style={{ padding: '18px 45px', fontSize: '1.2rem' }} onClick={() => navigate("/book-demo")}>
                Book Demo
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer>
        <p>© 2026 RingRing CRM. The ultimate CRM with automatic calling for modern teams.</p>
      </footer>
      <div className="whatsapp-container">
  <a
    href="https://wa.me/918298171197?text=Hi%20I%20want%20demo%20of%20RingRing%20CRM"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-main"
  >
    Chat on WhatsApp
  </a>

  <a
    href="https://wa.me/918298171197?text=Hi%20I%20want%20demo%20of%20RingRing%20CRM"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-icon"
  >
    💬
  </a>
</div>
    </div>
      </>
  );
}

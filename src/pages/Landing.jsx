import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export default function Landing() {
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
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

      .landing {
  min-height: 100vh;

  background:
    linear-gradient(
      rgba(11, 1, 32, 0.88),
      rgba(20, 5, 45, 0.92)
    ),
    url("https://res.cloudinary.com/djatdycpx/image/upload/v1768206860/6012933_hehrvn.jpg");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
}


        /* NAVBAR */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 8%;
        }

        .logo {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-links a {
          color: #ccc;
          text-decoration: none;
          font-size: 14px;
        }

        .nav-links button {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }

        /* HERO */
        .hero {
          padding: 100px 8% 80px;
          text-align: center;
        }

        .hero h1 {
          font-size: clamp(32px, 6vw, 56px);
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .hero span {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          max-width: 650px;
          margin: 0 auto 40px;
          color: #bbb;
          font-size: 16px;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          padding: 14px 26px;
          border-radius: 12px;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid #555;
          padding: 14px 26px;
          border-radius: 12px;
          color: white;
          cursor: pointer;
        }

        /* FEATURES */
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          padding: 80px 8%;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          padding: 26px;
          backdrop-filter: blur(12px);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
        }

        .feature-card h3 {
          margin-bottom: 10px;
        }

        /* REVIEWS */
        .reviews {
          padding: 80px 8%;
          text-align: center;
        }

        .reviews h2 {
          font-size: 32px;
          margin-bottom: 40px;
        }

        .review-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .review-card {
          background: rgba(255, 255, 255, 0.06);
          padding: 26px;
          border-radius: 18px;
        }

        .review-card p {
          color: #ddd;
        }

        .review-card span {
          display: block;
          margin-top: 12px;
          color: #aaa;
          font-size: 14px;
        }

        /* CTA */
        .cta {
          padding: 80px 8%;
          text-align: center;
        }

        .cta h2 {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .cta button {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border: none;
          padding: 16px 34px;
          border-radius: 14px;
          font-size: 18px;
          color: white;
          cursor: pointer;
        }

        /* FOOTER */
        .footer {
          padding: 30px;
          text-align: center;
          color: #777;
          font-size: 14px;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .nav-links a {
            display: none;
          }

          .hero {
            padding-top: 80px;
          }
        }
      `}</style>

      <div className="landing">
        {/* NAVBAR */}
        <header className="navbar">
          <div className="logo">Ring Ring CRM</div>
          <div className="nav-links">
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
            <button onClick={handleGetStarted}>Get Started</button>
          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <h1>
            Build Your <span>Custom CRM</span><br />
            Automate Calls. Close Faster.
          </h1>
          <p>
            A futuristic CRM designed for high-performance sales teams.
            Manage leads, automate calls, and grow faster — all in one platform.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="feature-card">
            <h3>📞 Auto Calling</h3>
            <p>Instantly call leads with smart automation.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Lead Management</h3>
            <p>Track, filter and convert leads efficiently.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Fast & Secure</h3>
            <p>Built for speed, security and scalability.</p>
          </div>
          <div className="feature-card">
            <h3>📱 Any Device</h3>
            <p>Perfect experience on mobile, tablet & desktop.</p>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews">
          <h2>Trusted by Sales Teams</h2>
          <div className="review-grid">
            <div className="review-card">
              ⭐⭐⭐⭐⭐
              <p>“Our sales calling efficiency doubled.”</p>
              <span>— Amit, Sales Manager</span>
            </div>
            <div className="review-card">
              ⭐⭐⭐⭐⭐
              <p>“Simple, modern and very powerful CRM.”</p>
              <span>— Neha, Founder</span>
            </div>
            <div className="review-card">
              ⭐⭐⭐⭐⭐
              <p>“Best CRM for Indian businesses.”</p>
              <span>— Rahul, Operations Head</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Start Building Your CRM Today</h2>
          <button onClick={handleGetStarted}>Get Started Now</button>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          © {new Date().getFullYear()} Ring Ring CRM. All rights reserved.
        </footer>
      </div>
    </>
  );
}

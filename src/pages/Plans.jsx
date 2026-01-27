import { useNavigate } from "react-router-dom";
import { startPayment } from "../utils/razorpay";

export default function Plans() {
  const navigate = useNavigate();

  const buyPlan = async (planName) => {
    const email = prompt("Enter your email");
    if (!email) return;

    await startPayment({ email, planName });
    navigate(`/signup?email=${email}`);
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

        .plans {
          min-height: 100vh;
          background: radial-gradient(circle at top, #1a0033, #000);
          color: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
          padding-bottom: 80px;
        }

        /* HEADER */
        .plans-header {
          text-align: center;
          padding: 80px 8% 40px;
        }

        .plans-header h1 {
          font-size: clamp(32px, 6vw, 52px);
          margin-bottom: 16px;
        }

        .plans-header span {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .plans-header p {
          color: #bbb;
          max-width: 600px;
          margin: auto;
        }

        /* CARDS */
        .plan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 32px;
          padding: 40px 8%;
        }

        .plan-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .plan-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 40px rgba(124, 58, 237, 0.4);
        }

        .popular {
          border: 2px solid #ec4899;
        }

        .badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
        }

        .plan-card h3 {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .price {
          font-size: 38px;
          font-weight: bold;
          margin: 20px 0;
        }

        .price span {
          font-size: 14px;
          color: #aaa;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 24px 0;
          text-align: left;
        }

        .features li {
          margin-bottom: 12px;
          color: #ddd;
        }

        .plan-card button {
          width: 100%;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border: none;
          padding: 14px;
          border-radius: 14px;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        /* BACK BUTTON */
        .back {
          text-align: center;
          margin-top: 40px;
        }

        .back button {
          background: transparent;
          border: 1px solid #555;
          padding: 12px 24px;
          border-radius: 12px;
          color: white;
          cursor: pointer;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .plan-card {
            padding: 26px;
          }
        }
      `}</style>

      <div className="plans">
        {/* HEADER */}
        <section className="plans-header">
          <h1>
            Choose Your <span>Perfect Plan</span>
          </h1>
          <p>
            Simple pricing. Powerful features. No hidden charges.
          </p>
        </section>

        {/* PLANS */}
        <section className="plan-grid">
          {/* BASIC */}
          <div className="plan-card">
            <h3>Basic</h3>
            <div className="price">₹4000 <span>/year</span></div>
            <ul className="features">
              <li>✔ Auto Calling</li>
              <li>✔ Lead Management</li>
              <li>✔ Dashboard Access</li>
              <li>✔ Email Support</li>
            </ul>
            <button onClick={() => buyPlan("Basic")}>
              Get Started
            </button>
          </div>

          {/* PRO */}
          <div className="plan-card popular">
            <div className="badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">₹6000 <span>/year</span></div>
            <ul className="features">
              <li>✔ Everything in Basic</li>
              <li>✔ Advanced Calling</li>
              <li>✔ Team Management</li>
              <li>✔ Priority Support</li>
            </ul>
            <button onClick={() => buyPlan("Pro")}>
              Get Started
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="plan-card">
            <h3>Enterprise</h3>
            <div className="price">Custom</div>
            <ul className="features">
              <li>✔ Unlimited Users</li>
              <li>✔ Custom CRM Setup</li>
              <li>✔ Dedicated Support</li>
              <li>✔ SLA & Integrations</li>
            </ul>
            <button onClick={() => buyPlan("Enterprise")}>
              Contact Sales
            </button>
          </div>
        </section>

        {/* BACK */}
        <div className="back">
          <button onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

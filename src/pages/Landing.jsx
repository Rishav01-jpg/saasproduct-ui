import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import logo from "../assets/logo.png";
import howitworks from "../assets/howitworks.png";
import { Helmet } from "react-helmet-async";
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
    <Helmet>
  <title>Ring Ring CRM - Auto Calling CRM for Sales Teams</title>
  <meta name="description" content="Upload contacts, automatically call leads, track conversations and grow your sales with Ring Ring CRM." />
  <link rel="canonical" href="https://ringringcrm.com/" />
</Helmet>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

      .landing {
  min-height: 100vh;
  overflow-x: hidden;

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
          width: 100%;
          box-sizing: border-box;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
          flex-shrink: 1;
          min-width: 0;
        }

        .logo span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logo-img {
          width: 76px;
          height: 76px;
          object-fit: contain;
          flex-shrink: 0;
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
          padding: 60px 8% 10px;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }

        .hero h1 {
          font-size: clamp(28px, 6vw, 56px);
          line-height: 1.2;
          margin-bottom: 20px;
          word-wrap: break-word;
          overflow-wrap: anywhere;
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

        /* PRODUCT PREVIEW */
        .product-preview {
          padding: 0 8% 80px;
          text-align: center;
        }

        .preview-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .preview-container img {
          width: 100%;
          display: block;
          filter: brightness(0.9);
        }

        /* FEATURES */
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          padding: 60px 8%;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          padding: 30px;
          backdrop-filter: blur(12px);
          transition: transform 0.3s ease, background 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.1);
        }

        .feature-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          margin-bottom: 12px;
          font-size: 20px;
        }

        /* INFO SECTIONS */
        .info-section {
          display: flex;
          align-items: flex-start;
          gap: 60px;
          padding: 70px 8%;
        }

        .info-section.reverse {
          flex-direction: row-reverse;
        }

        .info-content {
          flex: 1;
        }

        .info-content h2 {
          font-size: clamp(24px, 4vw, 40px);
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .info-content p {
          color: #bbb;
          font-size: 18px;
          line-height: 1.6;
        }

        .info-image {
          flex: 1;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .info-image img {
          width: 100%;
          display: block;
          transition: transform 0.5s ease;
        }

        .info-image:hover img {
          transform: scale(1.05);
        }

        /* REVIEWS */
        .reviews {
          padding: 20px 8%;
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
          padding: 10px;
          text-align: center;
          color: #777;
          font-size: 14px;
        }

        /* CONTACT */
        .contact {
          padding: 20px 8%;
          text-align: center;
        }

        .contact h2 {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .contact p {
          color: #bbb;
          margin-bottom: 30px;
        }

        .contact-box {
          max-width: 500px;
          margin: auto;
          padding: 30px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .contact-box p {
          font-size: 18px;
          margin: 12px 0;
        }

        .contact-box a {
          color: #ec4899;
          text-decoration: none;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .navbar {
            padding: 15px 4%;
            flex-direction: column;
            gap: 15px;
          }

          .logo {
            font-size: 18px;
          }

          .logo-img {
            width: 50px;
            height: 50px;
          }

          .nav-links {
            width: 100%;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .nav-links a {
            display: none;
          }

          .nav-links button {
            padding: 8px 14px;
            font-size: 13px;
          }

          .hero {
            padding: 40px 5% 10px;
          }

          .hero h1 {
            font-size: clamp(22px, 7vw, 32px);
          }

          .hero p {
            font-size: 14px;
            padding: 0 10px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: stretch;
            padding: 0 10px;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            padding: 12px 20px;
          }

          .info-section, .info-section.reverse {
            flex-direction: column;
            gap: 30px;
            text-align: center;
            padding: 40px 5%;
          }

          .info-content h2 {
            font-size: 22px;
          }

          .info-content p {
            font-size: 15px;
          }

          .info-image {
            order: -1;
          }

          .product-preview {
            padding: 0 5% 40px;
          }

          .features {
            padding: 40px 5%;
            grid-template-columns: 1fr;
          }

          .contact-box {
            padding: 20px;
            margin: 0 10px;
          }
        }

        /* EXTRA SMALL (Galaxy Z Fold 5 folded, etc.) */
        @media (max-width: 380px) {
          .navbar {
            padding: 10px 2%;
          }

          .logo {
            font-size: 16px;
          }

          .logo-img {
            width: 80px;
            height: 80px;
          }

          .nav-links button {
            padding: 6px 10px;
            font-size: 12px;
            flex: 1;
          }

          .hero h1 {
            font-size: 20px;
          }

          .hero-buttons {
            padding: 0 5%;
          }
        }
          /* HOW IT WORKS */
.how-it-works {
  padding: 80px 8%;
  text-align: center;
}

.how-it-works h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.how-it-works p {
  color: #bbb;
  max-width: 700px;
  margin: 0 auto 40px;
}

.how-image {
  max-width: 1000px;
  margin: auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

.how-image img {
  width: 100%;
  display: block;
}
      `}</style>

      <div className="landing">
        {/* NAVBAR */}
        <header className="navbar">
          <div className="logo">
  <img src={logo} alt="logo" className="logo-img" />
  <span>Ring Ring CRM</span>
</div>
        <div className="nav-links">
  <a href="/login">Login</a>
  <a href="/signup">Signup</a>
  <a href="/plans">Pricing</a>
  
  <button
  onClick={() => navigate("/book-demo")}
  style={{
    background: "transparent",
    border: "1px solid #ec4899",
    color: "#ec4899"
  }}
>
  Book Demo
</button>
  <button onClick={handleGetStarted}>Get Started</button>
</div>
        </header>

        {/* HERO */}
        <section className="hero">
          <h1>
             <span>Ring Ring CRM</span><br />
            Upload Your contacts, Start Calling, and Grow Faster
          </h1>
          <p>
          Accelerate Your Business
Eliminate manual dialing and instantly log every call and outcome. Focus 100% on the conversation.
          </p>
         <div className="hero-buttons">
  <button className="btn-primary" onClick={handleGetStarted}>
    Get Started
  </button>

 <button
  className="btn-secondary"
  style={{ border: "1px solid #ec4899", color: "#e764a5ff" }}
  onClick={() => navigate("/book-demo")}
>
  Book Demo
</button>

<button
    className="btn-secondary"
    onClick={() => navigate("/plans")}
  >
    Pricing
  </button>

  <button
    className="btn-secondary"
    onClick={() => navigate("/login")}
  >
    Login

  </button>
   <button
    className="btn-secondary"
    onClick={() => navigate("/signup")}
  >
    Signup
  </button>

   
</div>
        </section>

        {/* INFO SECTION 1 */}
        <section className="info-section">
          <div className="info-content">
            <h2>Streamline Your Sales Process</h2>
            <p>
             Our intuitive and user-friendly interface is designed to simplify your workflow, allowing your team to focus on what truly matters—building strong customer relationships. Instead of dealing with complex systems or manual tasks, your team can work efficiently and stay engaged with contacts.

With automated logging, every interaction is recorded seamlessly, saving time and ensuring no detail is missed. Instant access to contact information allows for quicker, more personalized conversations, helping your team stay organized and never miss an opportunity to connect.

            </p>
          </div>
          <div className="info-image">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
              alt="Sales Team" 
            />
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="feature-card">
            <img 
              className="feature-img" 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400" 
              alt="Auto Calling" 
            />
            <h3> Auto Calling</h3>
            <p>Instantly call your Contacts with smart automation.</p>
          </div>
          <div className="feature-card">
            <img 
              className="feature-img" 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" 
              alt="Contact Management" 
            />
            <h3> Contact Management</h3>
            <p>Track, filter and convert Contacts efficiently.</p>
          </div>
          <div className="feature-card">
            <img 
              className="feature-img" 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" 
              alt="Analytics" 
            />
            <h3> Analytics </h3>
            <p>Track and analyze call metrics, conversion rates, and more.</p>
          </div>
        </section>
{/* HOW IT WORKS */}
<section className="how-it-works">
  <h2>How Ring Ring CRM Works</h2>
  <p>
    Upload your contacts, choose your calling method, and start auto calling.
    The system automatically moves to the next contact, tracks call results,
    and helps your team close more deals faster.
  </p>

  <div className="how-image">
    <img src={howitworks} alt="How Ring Ring CRM Works" />
  </div>
</section>
        {/* INFO SECTION 2 (REVERSED) */}
        <section className="info-section reverse">
          <div className="info-content">
            <h2>Data-Driven Decisions</h2>
            <p>
             Gain valuable and in-depth insights into your sales performance with ease. Our advanced analytics tools provide a clear and detailed view of your data, helping you understand customer behavior, track key metrics, and uncover important trends. By analyzing this information, you can make smarter, data-driven decisions that improve your overall strategy.

With these powerful insights, you can identify what’s working, eliminate inefficiencies, and optimize your workflow for better productivity. This ultimately helps you streamline your sales process, enhance team performance, and significantly boost your conversion rates, leading to consistent business growth.
            </p>
          </div>
          <div className="info-image">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
              alt="Data Analytics" 
            />
          </div>
        </section>


        {/* REVIEWS */}
        <section className="reviews">
          <h2>Trusted by Business Owner</h2>
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
{/* CONTACT US */}
<section className="contact">
  <h2>Contact Us</h2>
  <p>Have questions? We’re here to help you .</p>

  <div className="contact-box">
    <p>
      📧 <strong>Email:</strong>{" "}
      <a href="mailto:support@ringringcrm.com">
        support@ringringcrm.com
      </a>
    </p>

    <p>
      📞 <strong>Phone:</strong>{" "}
      <a href="tel:8210690050">
        +91 8210690050
      </a>
    </p>
  </div>
</section>
        {/* CTA */}
        <section className="cta">
          <h2>Start Calling Your Contacts Today and Eliminate Manual Dialing</h2>
          <button onClick={handleGetStarted}>Get Started Now</button>
        </section>

        {/* FOOTER */}
       <footer className="footer">
  © {new Date().getFullYear()} Ring Ring CRM. All rights reserved.
  <br />
  <a href="/about">About</a> |
  <a href="/plans">Pricing</a> |
  <a href="/login">Login</a> |
  <a href="/signup">Signup</a> |
  <a href="/crm-with-automatic-calling">Auto Dialer</a>
</footer>
      </div>
    </>
  );
}
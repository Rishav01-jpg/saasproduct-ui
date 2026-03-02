import { useState } from "react";

export default function BookDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Booking demo...");

    try {
      const res = await fetch("https://saasproduct-backend.onrender.com/api/demo/book-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Demo booked for tomorrow 11:00 AM! Check your email.");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .book-demo-page {
          min-height: 100vh;
          background:
            linear-gradient(rgba(11, 1, 32, 0.88), rgba(20, 5, 45, 0.92)),
            url("https://res.cloudinary.com/djatdycpx/image/upload/v1768206860/6012933_hehrvn.jpg");
          background-size: cover;
          background-position: center;
          color: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .demo-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .demo-card h2 {
          font-size: 30px;
          margin-bottom: 12px;
        }

        .demo-card p {
          color: #bbb;
          margin-bottom: 28px;
          font-size: 15px;
        }

        .demo-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .demo-form input {
          padding: 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          font-size: 14px;
        }

        .demo-form input::placeholder {
          color: #aaa;
        }

        .demo-btn {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          border: none;
          padding: 14px;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease;
        }

        .demo-btn:hover {
          transform: translateY(-2px);
        }

        .demo-message {
          margin-top: 20px;
          color: #e9d5ff;
          font-weight: 600;
          font-size: 15px;
        }
      `}</style>

      <div className="book-demo-page">
        <div className="demo-card">
          <h2>Book Your Live CRM Demo</h2>
        

          <form className="demo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <button type="submit" className="demo-btn">
              Book Demo 
            </button>
          </form>

          {message && <p className="demo-message">{message}</p>}
        </div>
      </div>
    </>
  );
}
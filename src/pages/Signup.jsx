import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const emailFromPayment = params.get("email");

  if (emailFromPayment) {
    setEmail(emailFromPayment);
  }
}, []);

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Signup failed");
        setLoading(false);
        return;
      }

      setSuccess("Signup successful. Please login.");

      // redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Start your CRM journey</p>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <span>
          Already have an account? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ================= NORMAL LOGIN =================
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("tenantId", data.tenantId);
      localStorage.setItem("role", data.role);

      if (data.role === "superadmin") {
        navigate("/superadmin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError("");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google-login`,
        { credential: credentialResponse.credential }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("tenantId", res.data.tenantId);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "superadmin") {
        navigate("/superadmin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.msg || "Google login failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Login to your CRM</p>

        {error && <div className="auth-error">{error}</div>}

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

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* GOOGLE SIGN IN */}
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Sign-In failed")}
          />
        </div>

        <span>
          Don’t have an account? <a href="/signup">Sign up</a>
        </span>
      </div>
    </div>
  );
}

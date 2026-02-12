import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SingleDashboard from "./pages/SingleDashboard";
import SuperAdmin from "./pages/SuperAdmin";
import Landing from "./pages/Landing";
import Plans from "./pages/Plans";
import ProtectedRoute from "./components/ProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Leads from "./pages/Leads";


import "./styles/theme.css";

export default function App() {
  return (
  <GoogleOAuthProvider clientId="76341361127-6l495332441mlobm5vgqoi8tlr3r0hld.apps.googleusercontent.com">
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard/:id"
  element={
    <ProtectedRoute>
      <SingleDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/superadmin"
  element={
    <ProtectedRoute roleRequired="superadmin">
      <SuperAdmin />
    </ProtectedRoute>
  }
/>

<Route path="/" element={<Landing />} />
<Route path="/plans" element={<Plans />} />
<Route
  path="/dashboard/:id/leads"
  element={
    <ProtectedRoute>
      <Leads />
    </ProtectedRoute>
  }
/>





      </Routes>
      </BrowserRouter>
  </GoogleOAuthProvider>
  );
}

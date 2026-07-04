import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "../../styles/admin.css";

function AdminLoginPage() {
  const { isAdmin, login } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/admin");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit} noValidate>
        <h1 className="admin-login-title">Rabbit Admin</h1>
        <p className="admin-login-subtitle">Sign in to manage your store</p>

        <label className="admin-label">
          Email
          <input
            className="admin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
        </label>

        <label className="admin-label">
          Password
          <input
            className="admin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="admin-btn admin-btn--green admin-login-btn">
          Sign In
        </button>

        <p className="admin-login-hint">Demo credentials: admin@example.com / admin123</p>
      </form>
    </div>
  );
}

export default AdminLoginPage;

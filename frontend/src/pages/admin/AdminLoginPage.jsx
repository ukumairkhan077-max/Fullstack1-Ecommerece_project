import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin.css";

function AdminLoginPage() {
  const { isAuthenticated, isAdmin, login, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login({ email, password });

    if (!result.success) {
      setError(result.message || "Invalid email or password.");
      return;
    }

    if (result.user.role !== "admin") {
      // Logged in fine, but this account isn't an admin — sign back out
      // of the admin area rather than letting a customer account in.
      logout();
      setError("This account does not have admin access.");
      return;
    }

    navigate("/admin");
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

        <button type="submit" className="admin-btn admin-btn--green admin-login-btn" disabled={loading}>
          {loading ? "Signing In…" : "Sign In"}
        </button>

        <p className="admin-login-hint">
          Demo admin (after running <code>npm run seed</code> in the backend):
          <br />admin@example.com / admin123
        </p>
      </form>
    </div>
  );
}

export default AdminLoginPage;

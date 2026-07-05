import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Loginpicture from "../assets/images/login.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/loginregister.css";

function LoginPage() {
  const { isAuthenticated, login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login({ email, password });
    if (!result.success) {
      setError(result.message || "Invalid email or password.");
      return;
    }
    navigate("/");
  };

  return (
    <>
      <Header />

      <div className="logincontainer">

        <div className="loginform">

          <h5>Hi There 👋</h5>

          <h2>Welcome Back</h2>

          <p>Enter your email and password to login.</p>

          <form onSubmit={handleSubmit}>

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: "#e5391c", fontSize: "13px", marginTop: "-8px" }}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Signing In…" : "Sign In"}
            </button>

            <p className="bottomtext">
              Don't have an account?
              <Link to="/register"> Register Now</Link>
            </p>

          </form>

        </div>

        <div className="loginpicture">
          <img
            src={Loginpicture}
            alt="Login"
          />
        </div>

      </div>

      <Footer />
    </>
  );
}

export default LoginPage;

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Loginpicture from "../assets/images/login.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/loginregister.css";

function RegisterPage() {
  const { isAuthenticated, register, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const result = await register({ name, email, password });
    if (!result.success) {
      setError(result.message || "Could not create your account.");
      return;
    }
    navigate("/");
  };

  return (
    <>
      <Header />

      <div className="logincontainer">

        <div className="loginform">

          <h5>Welcome 👋</h5>

          <h2>Create Account</h2>

          <p>Create your account to continue shopping.</p>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: "#e5391c", fontSize: "13px", marginTop: "-8px" }}>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account…" : "Register"}
            </button>

            <p className="bottomtext">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

          </form>

        </div>

        <div className="loginpicture">
          <img
            src={Loginpicture}
            alt="Register"
          />
        </div>

      </div>

      <Footer />
    </>
  );
}

export default RegisterPage;

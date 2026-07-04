import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Loginpicture from "../assets/images/login.webp";
import { Link } from "react-router-dom";
import "../styles/loginregister.css";

function LoginPage() {
  return (
    <>
      <Header />

      <div className="logincontainer">

        <div className="loginform">

          <h5>Hi There 👋</h5>

          <h2>Welcome Back</h2>

          <p>Enter your email and password to login.</p>

          <form>

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

            <button type="submit">
              Sign In
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
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Loginpicture from "../assets/images/login.webp";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <>
      <Header />

      <div className="logincontainer">

        <div className="loginform">

          <h5>Welcome 👋</h5>

          <h2>Create Account</h2>

          <p>Create your account to continue shopping.</p>

          <form>

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
            />

            <button type="submit">
              Register
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
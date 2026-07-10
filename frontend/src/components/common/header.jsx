import "../../styles/header.css";
import twitter   from "../../assets/images/twitter.svg";
import facebook  from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { totalQuantity, openDrawer } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleAccountClick = () => {
    closeMenu();
    if (isAuthenticated) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const accountLabel = isAuthenticated
    ? `👋 ${(user?.name || "Account").split(" ")[0]} (Logout)`
    : "👤 Account";

  return (
    <>
      {/* Top bar */}
      <div className="top-bar">
        <div className="social-icons">
          <img src={twitter}   alt="Twitter"   />
          <img src={facebook}  alt="Facebook"  />
          <img src={instagram} alt="Instagram" />
        </div>
        <p className="shipping-text">We ship worldwide - Fast and reliable shipping!</p>
        <div className="contact-number">+1 (234) 567-890</div>
      </div>

      {/* Main header */}
      <header className="header">
        <button
          className={`hamburger-btn ${menuOpen ? "hamburger-btn--open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>Rabbit</h1>
          </Link>
        </div>

        <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/collection/men"        className="nav-link" onClick={closeMenu}>MEN</Link></li>
            <li><Link to="/collection/women"      className="nav-link" onClick={closeMenu}>WOMEN</Link></li>
            <li><Link to="/collection/topwear"    className="nav-link" onClick={closeMenu}>TOP WEAR</Link></li>
            <li><Link to="/collection/bottomwear" className="nav-link" onClick={closeMenu}>BOTTOM WEAR</Link></li>
          </ul>
          <div className="mobile-menu-actions">
            <Link to="/admin" className="admin-btn" onClick={closeMenu}>Admin</Link>
            <button type="button" className="profilebtn profilebtn--link" onClick={handleAccountClick}>
              {accountLabel}
            </button>
          </div>
        </nav>

        {menuOpen && <div className="nav-backdrop" onClick={closeMenu}></div>}

        <div className="header-actions">
          <Link to="/admin" className="admin-btn admin-btn--desktop">Admin</Link>

          <button
            type="button"
            className="profilebtn profilebtn--desktop"
            onClick={handleAccountClick}
            title={isAuthenticated ? `Logged in as ${user?.name || "you"} — click to log out` : "Login / Register"}
          >
            {isAuthenticated ? "👋" : "👤"}
          </button>

          {/* Cart icon with badge */}
          <button className="cart-icon-btn" onClick={openDrawer} aria-label="Open cart">
            🛒
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </button>

          <span className="search-icon">🔍</span>
        </div>
      </header>
    </>
  );
}

export default Header;

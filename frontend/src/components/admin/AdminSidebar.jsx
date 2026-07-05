import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar({ mobileOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navClass = ({ isActive }) => `admin-nav-item${isActive ? " active" : ""}`;

  return (
    <aside className={`admin-sidebar ${mobileOpen ? "admin-sidebar--open" : ""}`}>
      <div className="admin-sidebar__top-row">
        <div className="admin-sidebar__brand">Rabbit</div>
        <button className="admin-sidebar__close" onClick={onClose} aria-label="Close menu">✕</button>
      </div>

      <NavLink to="/admin" end className="admin-sidebar__heading" onClick={onClose}>
        Admin Dashboard
      </NavLink>

      <nav className="admin-sidebar__nav">
        <NavLink to="/admin/users" className={navClass} onClick={onClose}>👤 Users</NavLink>
        <NavLink to="/admin/products" className={navClass} onClick={onClose}>🏷️ Products</NavLink>
        <NavLink to="/admin/orders" className={navClass} onClick={onClose}>📦 Orders</NavLink>
        <NavLink to="/" className={navClass} onClick={onClose}>🏠 Shop</NavLink>
      </nav>

      <button className="admin-logout-btn" onClick={handleLogout}>
        ⏻ Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;

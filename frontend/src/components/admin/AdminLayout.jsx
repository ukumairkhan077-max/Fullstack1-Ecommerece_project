import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import "../../styles/admin.css";

function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-shell">
      <div className="admin-mobile-topbar">
        <button
          className="admin-mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin menu"
        >
          ☰
        </button>
        <span className="admin-mobile-title">Rabbit Admin</span>
      </div>

      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {mobileOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setMobileOpen(false)}></div>
      )}

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

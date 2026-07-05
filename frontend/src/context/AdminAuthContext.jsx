import { createContext, useContext, useState, useCallback } from "react";

const AdminAuthContext = createContext();

const STORAGE_KEY = "rabbit_admin_session";

// Demo-only credentials — there is no backend in this project, so the admin
// "login" simply gates the /admin routes on the client. Swap this out for a
// real auth check if/when a backend is added.
const DEMO_ADMIN_EMAIL = "admin@example.com";
const DEMO_ADMIN_PASSWORD = "admin123";

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === "true"
  );

  const login = useCallback((email, password) => {
    const ok =
      email.trim().toLowerCase() === DEMO_ADMIN_EMAIL &&
      password === DEMO_ADMIN_PASSWORD;
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAdmin(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

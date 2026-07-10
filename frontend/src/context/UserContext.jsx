import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import api from "../services/api";

const UserContext = createContext();

const STORAGE_KEY = "rabbit_admin_users";

// ---- Local (no-backend) fallback helpers ----
function loadLocalUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return [
    {
      id: "u-admin",
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
  ];
}

function normalizeBackendUser(u) {
  return { ...u, id: u._id || u.id };
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendMode = useRef(false);

  // Users are only loaded from the backend once an admin is logged in
  // (the list endpoint requires an admin JWT) — see AdminUsersPage, which
  // calls refreshUsers() itself. Until then we just show local demo data
  // so the page still renders something before backend is confirmed.
  const refreshUsers = useCallback(async () => {
    try {
      const data = await api.getUsers();
      backendMode.current = true;
      setUsers(data.map(normalizeBackendUser));
    } catch {
      backendMode.current = false;
      setUsers(loadLocalUsers());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  useEffect(() => {
    if (backendMode.current || loading) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch {
      // storage full/unavailable — fail silently
    }
  }, [users, loading]);

  const addUser = useCallback(async (data) => {
    if (backendMode.current) {
      const created = await api.createUser(data);
      setUsers((prev) => [normalizeBackendUser(created), ...prev]);
      return;
    }
    setUsers((prev) => [...prev, { id: `u-${Date.now()}`, ...data }]);
  }, []);

  const updateUserRole = useCallback(async (id, role) => {
    if (backendMode.current) {
      await api.updateUserRole(id, role);
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }, []);

  const updateUser = useCallback(async (id, data) => {
    if (backendMode.current) {
      const updated = await api.updateUser(id, data);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...normalizeBackendUser(updated) } : u)));
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  }, []);

  const deleteUser = useCallback(async (id) => {
    if (backendMode.current) {
      await api.deleteUser(id);
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loading, refreshUsers, addUser, updateUser, updateUserRole, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}

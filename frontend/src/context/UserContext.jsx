import { createContext, useContext, useState, useCallback, useEffect } from "react";

const UserContext = createContext();

const STORAGE_KEY = "rabbit_admin_users";

function loadInitialUsers() {
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
      role: "Admin",
    },
  ];
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState(loadInitialUsers);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch {
      // storage full/unavailable — fail silently
    }
  }, [users]);

  const addUser = useCallback((data) => {
    setUsers((prev) => [...prev, { id: `u-${Date.now()}`, ...data }]);
  }, []);

  const updateUserRole = useCallback((id, role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }, []);

  const deleteUser = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return (
    <UserContext.Provider value={{ users, addUser, updateUserRole, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}

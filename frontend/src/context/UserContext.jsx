import { createContext, useContext, useState, useCallback } from "react";
import api from "../services/api";

const UserContext = createContext();

function normalizeBackendUser(u) {
  return { ...u, id: u._id || u.id };
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Users are only loaded from the backend once an admin is logged in
  // (the list endpoint requires an admin JWT) — see AdminUsersPage, which
  // calls refreshUsers() itself on mount. There is no local/demo user list
  // to fall back to; a failed fetch is surfaced as an error instead.
  const refreshUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getUsers();
      setUsers(data.map(normalizeBackendUser));
    } catch (err) {
      setError(err.message || "Could not load users. Please try again later.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (data) => {
    const created = await api.createUser(data);
    setUsers((prev) => [normalizeBackendUser(created), ...prev]);
  }, []);

  const updateUserRole = useCallback(async (id, role) => {
    await api.updateUserRole(id, role);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }, []);

  const updateUser = useCallback(async (id, data) => {
    const updated = await api.updateUser(id, data);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...normalizeBackendUser(updated) } : u)));
  }, []);

  const deleteUser = useCallback(async (id) => {
    await api.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loading, error, refreshUsers, addUser, updateUser, updateUserRole, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}
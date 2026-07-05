import { createContext, useContext, useState, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext();

const TOKEN_KEY = "rabbit_token";
const USER_KEY = "rabbit_user";

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// A stable, anonymous id for guest shopping carts. Generated once per
// browser and reused until the person registers/logs in, at which point
// the backend automatically merges the guest cart into their account
// (see backend/routes/userRoutes.js -> mergeGuestCart).
export function getGuestId() {
  const KEY = "rabbit_guest_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const persistSession = (data) => {
    const { token, ...userInfo } = data;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.register({ name, email, password, guestId: getGuestId() });
      persistSession(data);
      return { success: true, user: data };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.login({ email, password, guestId: getGuestId() });
      persistSession(data);
      return { success: true, user: data };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isAdmin, loading, error, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

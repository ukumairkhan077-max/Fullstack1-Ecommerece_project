import { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

const TOKEN_KEY = "rabbit_token";
const USER_KEY = "rabbit_user";
const LOCAL_USERS_KEY = "rabbit_local_auth_users";

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

// ---- Local (no-backend) auth fallback ----
// If the backend isn't reachable at all (no server running / not deployed),
// register/login fall back to a browser-only demo mode so the site is still
// usable without a backend. This is NOT secure (plaintext, client-side only)
// and is only meant as a demo/offline fallback — never used when a real
// backend responds.
function loadLocalUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  // Seed with the same demo admin the backend's seed script creates
  return [
    { id: "local-admin", name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" },
  ];
}

function saveLocalUsers(users) {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {
    // storage full/unavailable — fail silently
  }
}

// A fetch() that can't reach the server at all throws a generic TypeError
// (e.g. "Failed to fetch"). A response the backend actually sent back (like
// "Invalid email or password") throws a plain Error with that message. We
// only want to fall back to local mode for the former — a real wrong
// password from a reachable backend should surface as a real error.
function isNetworkError(err) {
  return err instanceof TypeError;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const persistSession = (data) => {
    const { token, ...userInfo } = data;
    localStorage.setItem(TOKEN_KEY, token || "local-demo-token");
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
      if (!isNetworkError(err)) {
        setError(err.message);
        setLoading(false);
        return { success: false, message: err.message };
      }

      // No backend reachable — fall back to local demo registration
      const users = loadLocalUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        setLoading(false);
        return { success: false, message: "A user with this email already exists (local demo mode)." };
      }
      const newUser = { id: `local-${Date.now()}`, name, email, password, role: "customer" };
      saveLocalUsers([...users, newUser]);
      const session = { _id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
      persistSession(session);
      setLoading(false);
      return { success: true, user: session };
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
      if (!isNetworkError(err)) {
        setError(err.message);
        setLoading(false);
        return { success: false, message: err.message };
      }

      // No backend reachable — fall back to local demo login
      const users = loadLocalUsers();
      const match = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!match) {
        setLoading(false);
        return { success: false, message: "Invalid email or password (local demo mode)." };
      }
      const session = { _id: match.id, name: match.name, email: match.email, role: match.role };
      persistSession(session);
      setLoading(false);
      return { success: true, user: session };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // On load, double-check any stored session is still valid against the
  // real backend. This matters if, say, an admin deletes a user directly
  // in the database — without this check, that browser would be stuck with
  // a stale "logged in" session forever (and /login would just bounce them
  // back to "/" instead of letting them sign in again).
  //
  // Only a real "this account/token is invalid" response clears the
  // session — a network error (backend unreachable / local demo mode)
  // leaves the existing session alone, since local-only sessions can't be
  // validated against a server that doesn't exist for them.
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token || token === "local-demo-token") return; // local-only session, nothing to check

    let cancelled = false;
    api.getProfile().catch((err) => {
      if (cancelled) return;
      if (!isNetworkError(err)) {
        // Backend reached us and said this session is no longer valid
        logout();
      }
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

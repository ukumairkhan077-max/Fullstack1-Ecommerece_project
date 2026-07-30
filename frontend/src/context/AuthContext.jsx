import { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

const TOKEN_KEY = "rabbit_token";

// A stable, anonymous id for guest shopping carts. Generated once per
// browser and reused until the person registers/logs in, at which point
// the backend automatically merges the guest cart into their account
// (see backend/routes/userRoutes.js -> mergeGuestCart).
//
// This is the one thing we intentionally keep in localStorage: it isn't
// user data, isn't sensitive, and has no server-side equivalent for an
// anonymous visitor.
export function getGuestId() {
  const KEY = "rabbit_guest_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `guest_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}

// A fetch() that can't reach the server at all throws a generic TypeError
// (e.g. "Failed to fetch"). A response the backend actually sent back (like
// "Invalid email or password") throws a plain Error with that message.
function isNetworkError(err) {
  return err instanceof TypeError;
}

const UNREACHABLE_MESSAGE = "Unable to connect to server. Please try again later.";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // True only while we're validating an existing token against the backend
  // on first load. Kept separate from `loading` (which is for the
  // login/register button state) so consumers can tell "we don't know yet
  // if you're logged in" apart from "a login request is in flight".
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const persistSession = (data) => {
    const { token, ...userInfo } = data;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    setUser(userInfo);
  };

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  // On mount: if we have a saved token, ask the backend who it belongs to.
  // The user's profile always comes from MongoDB — we never trust a
  // locally-cached copy of it. If the token is missing/invalid/expired,
  // we just end up logged out.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setInitializing(false);
      return;
    }

    let cancelled = false;
    api
      .getProfile()
      .then((profile) => {
        if (cancelled) return;
        setUser(profile);
      })
      .catch(() => {
        if (cancelled) return;
        // Either the token is invalid/expired, or the backend is
        // unreachable. Either way we can't confirm this session, so treat
        // the visitor as logged out rather than trusting stale local data.
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => {
        if (!cancelled) setInitializing(false);
      });

    return () => { cancelled = true; };
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.register({ name, email, password, guestId: getGuestId() });
      persistSession(data);
      return { success: true, user: data };
    } catch (err) {
      const message = isNetworkError(err) ? UNREACHABLE_MESSAGE : err.message;
      setError(message);
      return { success: false, message };
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
      const message = isNetworkError(err) ? UNREACHABLE_MESSAGE : err.message;
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Updates the logged-in user's own profile via the backend, then updates
  // the in-memory session with whatever MongoDB actually saved.
  const updateProfile = useCallback(async (payload) => {
    const updated = await api.updateProfile(payload);
    setUser((prev) => ({ ...prev, ...updated }));
    return updated;
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user, isAuthenticated, isAdmin,
        initializing, loading, error,
        register, login, logout, updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
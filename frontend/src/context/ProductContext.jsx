import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import seedProducts from "../services/product";
import api from "../services/api";
import { retryAsync } from "../services/retry";

const ProductContext = createContext();

const STORAGE_KEY = "rabbit_admin_products";

// ---- Local (no-backend) fallback helpers ----
// If the backend isn't reachable (e.g. you haven't set up/deployed it yet,
// or VITE_API_URL isn't configured), the app falls back to the same
// localStorage-backed demo mode used before the backend existed, so the
// storefront still works out of the box.
function loadLocalProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore corrupt storage, fall back to the seed file
  }
  return seedProducts.map((p, i) => ({ ...p, id: p.sku || `product-${i}` }));
}

// Normalises a product coming back from MongoDB (which uses `_id`) to the
// shape the rest of the app expects (`id`).
function normalizeBackendProduct(p) {
  return { ...p, id: p._id || p.id };
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendMode = useRef(false); // true once we've confirmed the API works

  // On mount: try the real backend first (retrying a few times, since a
  // MongoDB cold-start can take a couple of seconds and we don't want a
  // single slow first request to permanently lock the app into offline
  // demo mode for the rest of the session). Falls back to local/demo data
  // only after those retries are exhausted.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await retryAsync(() => api.getProducts());
        if (cancelled) return;
        if (Array.isArray(data)) {
          backendMode.current = true;
          setProducts(data.map(normalizeBackendProduct));
        } else {
          throw new Error("Unexpected response");
        }
      } catch {
        // Backend still unreachable after retries — use local demo data.
        backendMode.current = false;
        if (!cancelled) setProducts(loadLocalProducts());
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Keep the local fallback catalogue persisted so admin edits survive a
  // refresh when there's no backend attached.
  useEffect(() => {
    if (backendMode.current || loading) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // storage full/unavailable — fail silently
    }
  }, [products, loading]);

  const getProduct = useCallback(
    (id) => products.find((p) => p.id === id || p.sku === id),
    [products]
  );

  const addProduct = useCallback(async (data) => {
    if (backendMode.current) {
      const created = await api.createProduct(data);
      setProducts((prev) => [normalizeBackendProduct(created), ...prev]);
      return;
    }
    setProducts((prev) => {
      const id = data.sku || `product-${Date.now()}`;
      return [{ ...data, id }, ...prev];
    });
  }, []);

  const updateProduct = useCallback(async (id, data) => {
    if (backendMode.current) {
      const updated = await api.updateProduct(id, data);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? normalizeBackendProduct(updated) : p))
      );
      return;
    }
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, id } : p))
    );
  }, []);

  const deleteProduct = useCallback(async (id) => {
    if (backendMode.current) {
      await api.deleteProduct(id);
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}

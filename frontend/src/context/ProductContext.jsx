import { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../services/api";
import { retryAsync } from "../services/retry";

const ProductContext = createContext();

// Normalises a product coming back from MongoDB (which uses `_id`) to the
// shape the rest of the app expects (`id`).
function normalizeBackendProduct(p) {
  return { ...p, id: p._id || p.id };
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Loads the catalogue from the real backend. Retries a few times first,
  // since a MongoDB cold-start can take a couple of seconds. There is no
  // local/demo catalogue to fall back to — if the backend can't be reached,
  // we surface that as an error state instead of showing fake data.
  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await retryAsync(() => api.getProducts());
      if (!Array.isArray(data)) throw new Error("Unexpected response from server");
      setProducts(data.map(normalizeBackendProduct));
    } catch (err) {
      setError(err.message || "Could not load products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refreshProducts();
      if (cancelled) return;
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProduct = useCallback(
    (id) => products.find((p) => p.id === id || p.sku === id),
    [products]
  );

  const addProduct = useCallback(async (data) => {
    const created = await api.createProduct(data);
    setProducts((prev) => [normalizeBackendProduct(created), ...prev]);
  }, []);

  const updateProduct = useCallback(async (id, data) => {
    const updated = await api.updateProduct(id, data);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? normalizeBackendProduct(updated) : p))
    );
  }, []);

  const deleteProduct = useCallback(async (id) => {
    await api.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts,
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
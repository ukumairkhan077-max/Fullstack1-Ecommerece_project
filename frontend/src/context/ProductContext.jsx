import { createContext, useContext, useState, useCallback, useEffect } from "react";
import seedProducts from "../services/product";

const ProductContext = createContext();

const STORAGE_KEY = "rabbit_admin_products";

// The catalogue always starts from services/product.js (the single source of
// truth requested for Product Management). Any admin edits are layered on
// top and persisted to localStorage so they survive a page refresh, since
// this project has no backend/database.
function loadInitialProducts() {
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

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(loadInitialProducts);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // storage full/unavailable — fail silently, in-memory state still works
    }
  }, [products]);

  const getProduct = useCallback(
    (id) => products.find((p) => p.id === id || p.sku === id),
    [products]
  );

  const addProduct = useCallback((data) => {
    setProducts((prev) => {
      const id = data.sku || `product-${Date.now()}`;
      return [{ ...data, id }, ...prev];
    });
  }, []);

  const updateProduct = useCallback((id, data) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, id } : p))
    );
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetToSeed = useCallback(() => {
    const fresh = seedProducts.map((p, i) => ({ ...p, id: p.sku || `product-${i}` }));
    setProducts(fresh);
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, getProduct, addProduct, updateProduct, deleteProduct, resetToSeed }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}

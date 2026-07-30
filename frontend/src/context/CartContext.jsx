import { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../services/api";
import { useAuth, getGuestId } from "./AuthContext";
import { retryAsync } from "../services/retry";

const CartContext = createContext();

// Each local cart item key = productId + size + color
const getItemKey = (id, size, color) => `${id}__${size}__${color}`;

// Converts a backend cart (Mongo shape: { products: [...], total }) into
// the flat { key, product, quantity, size, color } shape the rest of the
// app already expects.
function normalizeBackendCart(cart) {
  if (!cart || !Array.isArray(cart.products)) return [];
  return cart.products.map((item) => ({
    key: getItemKey(item.productId, item.size, item.color),
    product: {
      id: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      finalPrice: item.price,
    },
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }));
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const openDrawer  = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Whoever the cart currently belongs to: the logged-in user's id, or a
  // stable per-browser guest id. Re-evaluated whenever `user` changes so
  // that logging in switches us over to the (now backend-merged) user cart.
  const identity = user ? { userId: user._id } : { guestId: getGuestId() };

  // (Re)load the cart from the backend whenever who-we-are changes (mount,
  // login, logout). Retries a few times first, since a MongoDB cold-start
  // can take a couple of seconds. The cart is always MongoDB's copy — there
  // is no local/offline cart to fall back to. If it can't be loaded, we
  // surface that as an error rather than quietly showing an empty cart.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    async function load() {
      try {
        const query = user
          ? `?userId=${user._id}`
          : `?guestId=${getGuestId()}`;
        const cart = await retryAsync(() => api.getCart(query));
        if (cancelled) return;
        setCartItems(normalizeBackendCart(cart));
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Could not load your cart. Please refresh the page.");
        setCartItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const addToCart = useCallback(async (product, quantity, size, color) => {
    const key = getItemKey(product.id, size, color);
    setError("");

    // Optimistic local update so the UI feels instant.
    const previousItems = cartItems;
    setCartItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { key, product, quantity, size, color }];
    });
    setIsDrawerOpen(true);

    try {
      await api.addToCart({ ...identity, productId: product.id, quantity, size, color });
    } catch (err) {
      // Roll back the optimistic update — the backend is the source of
      // truth, so we don't keep an item the database doesn't actually have.
      setCartItems(previousItems);
      setError(err.message || "Could not add this item to your cart. Please try again.");
      throw err;
    }
  }, [identity, cartItems]);

  const removeItem = useCallback(async (key) => {
    const item = cartItems.find(i => i.key === key);
    if (!item) return;
    setError("");

    const previousItems = cartItems;
    setCartItems(prev => prev.filter(i => i.key !== key));

    try {
      await api.removeCartItem(item.product.id, { ...identity, size: item.size, color: item.color });
    } catch (err) {
      setCartItems(previousItems);
      setError(err.message || "Could not remove this item. Please try again.");
      throw err;
    }
  }, [cartItems, identity]);

  const setQuantity = useCallback(async (key, quantity) => {
    const item = cartItems.find(i => i.key === key);
    if (!item) return;
    setError("");

    const previousItems = cartItems;
    setCartItems(prev => prev.map(i => i.key === key ? { ...i, quantity } : i));

    try {
      await api.updateCartItem(item.product.id, { ...identity, quantity, size: item.size, color: item.color });
    } catch (err) {
      setCartItems(previousItems);
      setError(err.message || "Could not update the quantity. Please try again.");
      throw err;
    }
  }, [cartItems, identity]);

  const increaseQuantity = useCallback((key) => {
    const item = cartItems.find(i => i.key === key);
    if (item) setQuantity(key, item.quantity + 1).catch(() => {});
  }, [cartItems, setQuantity]);

  const decreaseQuantity = useCallback((key) => {
    const item = cartItems.find(i => i.key === key);
    if (item) setQuantity(key, Math.max(1, item.quantity - 1)).catch(() => {});
  }, [cartItems, setQuantity]);

  const clearCart = useCallback(async () => {
    const previousItems = cartItems;
    setCartItems([]);
    setError("");
    try {
      await api.clearCart(identity);
    } catch (err) {
      setCartItems(previousItems);
      setError(err.message || "Could not clear your cart. Please try again.");
      throw err;
    }
  }, [identity, cartItems]);

  const totalQuantity = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce(
    (s, i) => s + (i.product.finalPrice ?? i.product.price) * i.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cartItems, isDrawerOpen, openDrawer, closeDrawer,
      loading, error,
      addToCart, removeItem, increaseQuantity, decreaseQuantity, clearCart,
      totalQuantity, subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
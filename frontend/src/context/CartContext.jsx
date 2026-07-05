import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import api from "../services/api";
import { useAuth, getGuestId } from "./AuthContext";

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
  const backendMode = useRef(false);

  const openDrawer  = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Whoever the cart currently belongs to: the logged-in user's id, or a
  // stable per-browser guest id. Re-evaluated whenever `user` changes so
  // that logging in switches us over to the (now backend-merged) user cart.
  const identity = user ? { userId: user._id } : { guestId: getGuestId() };

  // (Re)load the cart from the backend whenever who-we-are changes
  // (mount, login, logout). Falls back to an empty local-only cart if the
  // backend isn't reachable, so the storefront still works without one.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const query = user
          ? `?userId=${user._id}`
          : `?guestId=${getGuestId()}`;
        const cart = await api.getCart(query);
        if (cancelled) return;
        backendMode.current = true;
        setCartItems(normalizeBackendCart(cart));
      } catch {
        backendMode.current = false;
        // Leave whatever local-only cart state already exists (e.g. items
        // added before we knew the backend was unreachable).
      }
    }

    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const addToCart = useCallback(async (product, quantity, size, color) => {
    const key = getItemKey(product.id, size, color);

    // Optimistic local update so the UI feels instant
    setCartItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { key, product, quantity, size, color }];
    });
    setIsDrawerOpen(true);

    if (backendMode.current) {
      try {
        await api.addToCart({ ...identity, productId: product.id, quantity, size, color });
      } catch {
        // Backend call failed — the optimistic local update above still stands
      }
    }
  }, [identity]);

  const removeItem = useCallback(async (key) => {
    const item = cartItems.find(i => i.key === key);
    setCartItems(prev => prev.filter(i => i.key !== key));

    if (backendMode.current && item) {
      try {
        await api.removeCartItem(item.product.id, { ...identity, size: item.size, color: item.color });
      } catch {
        // ignore — local state already updated
      }
    }
  }, [cartItems, identity]);

  const setQuantity = useCallback(async (key, quantity) => {
    const item = cartItems.find(i => i.key === key);
    setCartItems(prev => prev.map(i => i.key === key ? { ...i, quantity } : i));

    if (backendMode.current && item) {
      try {
        await api.updateCartItem(item.product.id, { ...identity, quantity, size: item.size, color: item.color });
      } catch {
        // ignore — local state already updated
      }
    }
  }, [cartItems, identity]);

  const increaseQuantity = useCallback((key) => {
    const item = cartItems.find(i => i.key === key);
    if (item) setQuantity(key, item.quantity + 1);
  }, [cartItems, setQuantity]);

  const decreaseQuantity = useCallback((key) => {
    const item = cartItems.find(i => i.key === key);
    if (item) setQuantity(key, Math.max(1, item.quantity - 1));
  }, [cartItems, setQuantity]);

  const clearCart = useCallback(async () => {
    setCartItems([]);
    if (backendMode.current) {
      try {
        await api.clearCart(identity);
      } catch {
        // ignore — local state already updated
      }
    }
  }, [identity]);

  const totalQuantity = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce(
    (s, i) => s + (i.product.finalPrice ?? i.product.price) * i.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cartItems, isDrawerOpen, openDrawer, closeDrawer,
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

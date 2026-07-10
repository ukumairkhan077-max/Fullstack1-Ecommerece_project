import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
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
  const backendMode = useRef(false);

  const openDrawer  = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Whoever the cart currently belongs to: the logged-in user's id, or a
  // stable per-browser guest id. Re-evaluated whenever `user` changes so
  // that logging in switches us over to the (now backend-merged) user cart.
  const identity = user ? { userId: user._id } : { guestId: getGuestId() };

  // (Re)load the cart from the backend whenever who-we-are changes
  // (mount, login, logout). Retries a few times first, since a MongoDB
  // cold-start can take a couple of seconds — without this, a single slow
  // request here could leave the cart in local-only mode for the rest of
  // the session even though the backend (and ProductContext) come online
  // moments later, which is exactly what caused cart items to end up with
  // fake local IDs that a real checkout then rejected.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const query = user
          ? `?userId=${user._id}`
          : `?guestId=${getGuestId()}`;
        const cart = await retryAsync(() => api.getCart(query));
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

  // Self-heals a cart that got "stuck" in local/offline mode — e.g. if the
  // very first page load raced a slow backend/DB cold-start and this tab
  // decided (once, at mount) to run in offline demo mode. Rather than
  // requiring a manual page refresh, this re-checks the real backend right
  // before checkout and, if it's reachable now, looks up each stale item
  // (identified by a non-ObjectId product id — a local demo id is the
  // product's SKU) against the live catalog by SKU and swaps in the real
  // MongoDB id, price, and image. Also best-effort pushes the corrected
  // items into the real backend cart so future loads stay in sync.
  // Returns the corrected item list to use immediately (state updates
  // don't apply until the next render, so callers shouldn't rely on
  // `cartItems` right after calling this — use the return value instead).
  const resyncWithBackend = useCallback(async () => {
    const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(String(id));
    const alreadyFine = cartItems.every((item) => isValidObjectId(item.product.id));
    if (backendMode.current && alreadyFine) return cartItems;

    let liveProducts;
    try {
      liveProducts = await api.getProducts();
      if (!Array.isArray(liveProducts)) return cartItems;
    } catch {
      return cartItems; // still genuinely offline — nothing more we can do
    }

    backendMode.current = true;

    const bySku = new Map(liveProducts.map((p) => [p.sku, p]));
    let changed = false;

    const resolved = cartItems.map((item) => {
      if (isValidObjectId(item.product.id)) return item;
      const match = bySku.get(item.product.id) || bySku.get(item.product.sku);
      if (!match) return item; // can't resolve (e.g. product was deleted) — leave as-is
      changed = true;
      const price = match.discountPrice || match.price;
      return {
        ...item,
        product: {
          ...item.product,
          id: match._id,
          image: match.images?.[0]?.url || item.product.image,
          price,
          finalPrice: price,
        },
      };
    });

    if (changed) {
      setCartItems(resolved);
      // Best-effort: mirror the corrected items into the real backend cart
      await Promise.all(
        resolved.map((item) =>
          api
            .addToCart({ ...identity, productId: item.product.id, quantity: item.quantity, size: item.size, color: item.color })
            .catch(() => null)
        )
      );
    }

    return resolved;
  }, [cartItems, identity]);

  const totalQuantity = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce(
    (s, i) => s + (i.product.finalPrice ?? i.product.price) * i.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cartItems, isDrawerOpen, openDrawer, closeDrawer,
      addToCart, removeItem, increaseQuantity, decreaseQuantity, clearCart,
      resyncWithBackend,
      totalQuantity, subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

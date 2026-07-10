import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import api from "./../services/api";

const OrderContext = createContext();

const STORAGE_KEY = "rabbit_orders";

function generateOrderId() {
  // Mongo-style dummy ObjectId, used only in local/offline demo mode
  const hex = () => Math.floor(Math.random() * 16).toString(16);
  return Array.from({ length: 24 }, hex).join("");
}

function loadInitialOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return [];
}

function isNetworkError(err) {
  return err instanceof TypeError;
}

// Converts a real backend Order (Mongo shape: orderItems, totalPrice, etc.)
// into the flat shape the confirmation page / admin orders table already
// expect (orderId, items, total, etc.) — so no UI changes were needed to
// support the real backend.
function normalizeBackendOrder(order) {
  return {
    orderId: order._id,
    orderDate: order.createdAt,
    estimatedDelivery: order.estimatedDelivery ||
      new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    items: (order.orderItems || []).map((item) => ({
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    })),
    subtotal: order.itemsPrice,
    shipping: order.shippingPrice,
    total: order.totalPrice,
    paymentMethod: order.paymentMethod,
    transactionId: order.paymentResult?.transactionId || null,
    status: order.status,
    customer: order.user?.name || `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() || "Customer",
    delivery: order.shippingAddress,
  };
}

export function OrderProvider({ children }) {
  const [checkoutInfo, setCheckoutInfo] = useState(null); // contact + delivery form
  const [checkoutId, setCheckoutId] = useState(null); // real backend Checkout _id, once created
  const [order, setOrder] = useState(null); // most recently finalised order (for confirmation page)
  const [orders, setOrders] = useState(loadInitialOrders); // full order history (for admin)
  const backendMode = useRef(false);

  useEffect(() => {
    if (backendMode.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // storage full/unavailable — fail silently, in-memory state still works
    }
  }, [orders]);

  const saveCheckoutInfo = useCallback((data) => {
    setCheckoutInfo(data);
  }, []);

  // Called from CheckoutPage once the shipping form is submitted. Tries to
  // create a real backend Checkout (requires the shopper to be logged in —
  // see the auth guard in CheckoutPage.jsx). If the backend isn't
  // reachable, this silently no-ops and the flow falls back to the fully
  // local/offline demo order flow further down (createOrder).
  const startBackendCheckout = useCallback(async ({ items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice }) => {
    try {
      const checkout = await api.createCheckout({
        checkoutItems: items.map((i) => ({
          productId: i.id,
          name: i.name,
          image: i.image,
          price: i.price,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      });
      setCheckoutId(checkout._id);
      return checkout._id;
    } catch (err) {
      if (!isNetworkError(err)) throw err; // a real validation error from a reachable backend
      setCheckoutId(null);
      return null; // signals the caller to fall back to local/offline mode
    }
  }, []);

  // Finalizes the order — either through the real backend (pay + finalize
  // the Checkout into an Order) if we have a checkoutId, or entirely
  // locally otherwise (offline/demo mode).
  const createOrder = useCallback(async ({ items, subtotal, shipping, total, paymentMethod, transactionId, customer }) => {
    if (checkoutId) {
      try {
        await api.payCheckout(checkoutId, { status: "paid", transactionId, paymentMethod });
        const realOrder = await api.finalizeCheckout(checkoutId);
        const normalized = normalizeBackendOrder(realOrder);
        setOrder(normalized);
        setOrders((prev) => [normalized, ...prev]);
        setCheckoutId(null);
        backendMode.current = true;
        return normalized;
      } catch {
        // fall through to local/offline order creation below
      }
    }

    const today = new Date();
    const delivery = new Date();
    delivery.setDate(today.getDate() + 7);

    const newOrder = {
      orderId: generateOrderId(),
      orderDate: today.toISOString(),
      estimatedDelivery: delivery.toISOString(),
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      transactionId: transactionId || null,
      status: "Pending",
      customer: customer || "Guest",
      delivery: checkoutInfo,
    };
    setOrder(newOrder);
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [checkoutId, checkoutInfo]);

  const clearOrder = useCallback(() => {
    setOrder(null);
    setCheckoutInfo(null);
    setCheckoutId(null);
  }, []);

  // Re-fetches the full order list from the real backend (Admin > Orders
  // page calls this on mount). Falls back to whatever's already in local
  // state if the backend isn't reachable.
  const refreshOrders = useCallback(async () => {
    try {
      const data = await api.getAllOrders();
      backendMode.current = true;
      setOrders(data.map(normalizeBackendOrder));
    } catch {
      backendMode.current = false;
      setOrders(loadInitialOrders());
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    if (backendMode.current) {
      try {
        await api.updateOrderStatus(orderId, status);
      } catch {
        // ignore — still update local view below so the UI stays responsive
      }
    }
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status } : o));
    setOrder(prev => (prev && prev.orderId === orderId ? { ...prev, status } : prev));
  }, []);

  const deleteOrder = useCallback(async (orderId) => {
    if (backendMode.current) {
      await api.deleteOrder(orderId);
    }
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
  }, []);

  return (
    <OrderContext.Provider value={{
      checkoutInfo, saveCheckoutInfo,
      startBackendCheckout,
      order, createOrder, clearOrder,
      orders, updateOrderStatus, deleteOrder, refreshOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}

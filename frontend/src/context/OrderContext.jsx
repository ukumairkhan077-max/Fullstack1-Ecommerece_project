import { createContext, useContext, useState, useCallback, useEffect } from "react";

const OrderContext = createContext();

const STORAGE_KEY = "rabbit_orders";

function generateOrderId() {
  // Mongo-style dummy ObjectId
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

export function OrderProvider({ children }) {
  const [checkoutInfo, setCheckoutInfo] = useState(null); // contact + delivery form
  const [order, setOrder] = useState(null); // most recently finalised order (for confirmation page)
  const [orders, setOrders] = useState(loadInitialOrders); // full order history (for admin)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // storage full/unavailable — fail silently, in-memory state still works
    }
  }, [orders]);

  const saveCheckoutInfo = useCallback((data) => {
    setCheckoutInfo(data);
  }, []);

  const createOrder = useCallback(({ items, subtotal, shipping, total, paymentMethod, transactionId, customer }) => {
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
      status: "Processing",
      customer: customer || "Guest",
      delivery: checkoutInfo,
    };
    setOrder(newOrder);
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [checkoutInfo]);

  const clearOrder = useCallback(() => {
    setOrder(null);
    setCheckoutInfo(null);
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status } : o));
    setOrder(prev => (prev && prev.orderId === orderId ? { ...prev, status } : prev));
  }, []);

  return (
    <OrderContext.Provider value={{
      checkoutInfo, saveCheckoutInfo,
      order, createOrder, clearOrder,
      orders, updateOrderStatus,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}

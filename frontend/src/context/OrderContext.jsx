import { createContext, useContext, useState, useCallback } from "react";
import api from "./../services/api";

const OrderContext = createContext();

// Converts a real backend Order (Mongo shape: orderItems, totalPrice, etc.)
// into the flat shape the confirmation page / admin orders table expect
// (orderId, items, total, etc.).
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
  const [orders, setOrders] = useState([]); // full order history (for admin)

  const saveCheckoutInfo = useCallback((data) => {
    setCheckoutInfo(data);
  }, []);

  // Called from CheckoutPage once the shipping form is submitted. Creates a
  // real backend Checkout (requires the shopper to be logged in — see the
  // auth guard in CheckoutPage.jsx). Any failure (network error or a real
  // validation error) is thrown so the caller can show it to the shopper.
  const startCheckout = useCallback(async ({ items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice }) => {
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
  }, []);

  // Finalizes the order through the real backend (pay + finalize the
  // Checkout into an Order). Requires startCheckout to have succeeded first.
  const createOrder = useCallback(async ({ paymentMethod, transactionId }) => {
    if (!checkoutId) {
      throw new Error("Checkout session not found. Please go back and try again.");
    }

    await api.payCheckout(checkoutId, { status: "paid", transactionId, paymentMethod });
    const realOrder = await api.finalizeCheckout(checkoutId);
    const normalized = normalizeBackendOrder(realOrder);
    setOrder(normalized);
    setOrders((prev) => [normalized, ...prev]);
    setCheckoutId(null);
    return normalized;
  }, [checkoutId]);

  const clearOrder = useCallback(() => {
    setOrder(null);
    setCheckoutInfo(null);
    setCheckoutId(null);
  }, []);

  // Re-fetches the full order list from the real backend (Admin > Orders
  // page calls this on mount). Throws on failure so the page can show an
  // error instead of silently showing stale/empty data.
  const refreshOrders = useCallback(async () => {
    const data = await api.getAllOrders();
    setOrders(data.map(normalizeBackendOrder));
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    await api.updateOrderStatus(orderId, status);
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status } : o));
    setOrder(prev => (prev && prev.orderId === orderId ? { ...prev, status } : prev));
  }, []);

  const deleteOrder = useCallback(async (orderId) => {
    await api.deleteOrder(orderId);
    setOrders(prev => prev.filter(o => o.orderId !== orderId));
  }, []);

  return (
    <OrderContext.Provider value={{
      checkoutInfo, saveCheckoutInfo,
      startCheckout,
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
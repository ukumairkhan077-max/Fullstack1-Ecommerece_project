import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer  = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  // Each cart item key = id + size + color
  const getItemKey = (id, size, color) => `${id}__${size}__${color}`;

  const addToCart = useCallback((product, quantity, size, color) => {
    const key = getItemKey(product.id, size, color);
    setCartItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { key, product, quantity, size, color }];
    });
    setIsDrawerOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setCartItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const increaseQuantity = useCallback((key) => {
    setCartItems(prev =>
      prev.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i)
    );
  }, []);

  const decreaseQuantity = useCallback((key) => {
    setCartItems(prev =>
      prev.map(i =>
        i.key === key
          ? { ...i, quantity: Math.max(1, i.quantity - 1) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

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

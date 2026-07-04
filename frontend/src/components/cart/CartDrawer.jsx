import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../../styles/cartdrawer.css";

function CartDrawer() {
  const navigate = useNavigate();
  const {
    cartItems, isDrawerOpen, closeDrawer,
    removeItem, increaseQuantity, decreaseQuantity, subtotal,
  } = useCart();

  const handleCheckout = () => {
    closeDrawer();
    navigate("/checkout");
  };

  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 9.99) : 0;
  const total    = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isDrawerOpen ? " cart-overlay--visible" : ""}`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div className={`cart-drawer${isDrawerOpen ? " cart-drawer--open" : ""}`}>

        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="cart-drawer__count">{cartItems.length}</span>
            )}
          </h2>
          <button className="cart-drawer__close" onClick={closeDrawer}>✕</button>
        </div>

        {/* Items */}
        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="cart-drawer__empty-icon">🛒</span>
              <p>Your cart is empty</p>
              <button className="cart-drawer__continue" onClick={closeDrawer}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => {
              const price = item.product.finalPrice ?? item.product.price;
              const image = item.product.image || item.product.images?.[0]?.url || "";
              const name  = item.product.name || item.product.title || "Product";
              return (
                <div key={item.key} className="cart-item">
                  <div className="cart-item__img-wrap">
                    <img src={image} alt={name} className="cart-item__img" />
                  </div>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{name}</p>
                    <div className="cart-item__meta">
                      {item.size  && <span className="cart-item__tag">Size: {item.size}</span>}
                      {item.color && <span className="cart-item__tag">Color: {item.color}</span>}
                    </div>
                    <div className="cart-item__bottom">
                      <div className="cart-item__qty">
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => decreaseQuantity(item.key)}
                        >−</button>
                        <span className="cart-item__qty-num">{item.quantity}</span>
                        <button
                          className="cart-item__qty-btn"
                          onClick={() => increaseQuantity(item.key)}
                        >+</button>
                      </div>
                      <div className="cart-item__prices">
                        <span className="cart-item__unit">${price.toFixed(2)}</span>
                        <span className="cart-item__subtotal">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.key)}
                    title="Remove"
                  >🗑</button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-totals">
              <div className="cart-totals__row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-totals__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-ship">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="cart-totals__row cart-totals__row--total">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              {subtotal < 100 && (
                <p className="cart-totals__free-msg">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>              CHECKOUT — ${total.toFixed(2)}
            </button>
          </div>
        )}

      </div>
    </>
  );
}

export default CartDrawer;

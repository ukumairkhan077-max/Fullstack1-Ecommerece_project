import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import "../../styles/checkout.css";

// Demo mobile-wallet payment methods — no real gateway is contacted.
// To go live, swap the simulated handlePay() below for a real JazzCash /
// Easypaisa merchant API integration (requires a backend, since both
// gateways need a server-side merchant ID + integrity salt/hash).
const PAYMENT_METHODS = [
  { id: "jazzcash", name: "JazzCash", icon: "📱", color: "#e2136e" },
  { id: "easypaisa", name: "Easypaisa", icon: "💳", color: "#0e8f45" },
];

function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  const { checkoutInfo, createOrder } = useOrder();

  const [method, setMethod] = useState("jazzcash");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal > 0 && subtotal < 100 ? 9.99 : 0;
  const total = subtotal + shipping;

  // Guard: must have completed checkout step first
  if (!checkoutInfo || cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="checkout-empty">
          <h2>No checkout info found</h2>
          <p>Please complete the checkout details first.</p>
          <button className="checkout-empty__btn" onClick={() => navigate("/checkout")}>
            Back to Checkout
          </button>
        </div>
      </>
    );
  }

  const activeMethod = PAYMENT_METHODS.find(m => m.id === method);

  const finalizeOrder = async (paymentMethod, transactionId) => {
    const items = cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name || item.product.title,
      image: item.product.image || item.product.images?.[0]?.url || "",
      price: item.product.finalPrice ?? item.product.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    setProcessing(true);
    try {
      await createOrder({
        items,
        subtotal,
        shipping,
        total,
        paymentMethod,
        transactionId,
        customer: `${checkoutInfo.firstName || ""} ${checkoutInfo.lastName || ""}`.trim() || "Guest",
      });
      await clearCart();
      navigate("/order-confirmation");
    } catch (err) {
      setError(err.message || "Something went wrong finalizing your order. Please try again.");
      setProcessing(false);
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    const digitsOnly = mobileNumber.replace(/[\s-]/g, "");
    if (!/^03\d{9}$/.test(digitsOnly)) {
      setError("Enter a valid 11-digit mobile number, e.g. 03001234567");
      return;
    }
    setError("");
    setProcessing(true);

    // Simulated payment confirmation — replace with a real API call/webhook
    // once a JazzCash / Easypaisa merchant account is wired up server-side.
    setTimeout(() => {
      const transactionId = `${method.toUpperCase()}-${Date.now()}`;
      finalizeOrder(activeMethod.name, transactionId);
    }, 1400);
  };

  return (
    <>
      <Header />
      <div className="checkout-page">
        <div className="payment-form">
          <h1 className="checkout-title">PAYMENT</h1>

          <div className="payment-back-row">
            <button className="payment-back-btn" onClick={() => navigate("/checkout")}>
              ← Back to delivery details
            </button>
          </div>

          <section className="checkout-section">
            <h3>Choose Payment Method</h3>
            <p className="payment-note">
              This is a demo mobile-wallet checkout — no real payment is processed and no real gateway is contacted.
            </p>

            <div className="wallet-method-grid">
              {PAYMENT_METHODS.map(m => (
                <button
                  type="button"
                  key={m.id}
                  className={`wallet-method-card ${method === m.id ? "wallet-method-card--active" : ""}`}
                  style={{ "--wallet-color": m.color }}
                  onClick={() => setMethod(m.id)}
                >
                  <span className="wallet-method-icon">{m.icon}</span>
                  <span className="wallet-method-name">{m.name}</span>
                </button>
              ))}
            </div>

            <form className="wallet-box" style={{ "--wallet-color": activeMethod.color }} onSubmit={handlePay}>
              <div className="wallet-box__header">
                <span className="wallet-method-icon">{activeMethod.icon}</span>
                <span>Pay with {activeMethod.name}</span>
              </div>

              <label className="ck-label">{activeMethod.name} Mobile Number
                <input
                  className={`ck-input ${error ? "ck-input--error" : ""}`}
                  type="tel"
                  placeholder="03XXXXXXXXX"
                  value={mobileNumber}
                  onChange={(e) => { setMobileNumber(e.target.value); setError(""); }}
                />
                {error && <span className="ck-error">{error}</span>}
              </label>

              <button type="submit" className="wallet-pay-btn" disabled={processing}>
                {processing ? "Processing Payment…" : `Pay $${total.toFixed(2)} with ${activeMethod.name}`}
              </button>
            </form>

            <div className="paypal-divider"><span>or</span></div>

            <button
              type="button"
              className="paypal-demo-btn"
              onClick={() => finalizeOrder(`${activeMethod.name} (Demo)`, `DEMO-${Date.now()}`)}
            >
              Simulate Successful {activeMethod.name} Payment
            </button>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-summary__items">
            {cartItems.map(item => {
              const price = item.product.finalPrice ?? item.product.price;
              const image = item.product.image || item.product.images?.[0]?.url || "";
              const name  = item.product.name || item.product.title || "Product";
              return (
                <div key={item.key} className="cs-item">
                  <img src={image} alt={name} className="cs-item__img" />
                  <div className="cs-item__info">
                    <p className="cs-item__name">{name}</p>
                    {item.size  && <span className="cs-item__tag">Size: {item.size}</span>}
                    {item.color && <span className="cs-item__tag">Color: {item.color}</span>}
                  </div>
                  <span className="cs-item__price">
                    ${(price * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="checkout-summary__totals">
            <div className="cs-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="cs-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="cs-free">FREE</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cs-row cs-row--total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default PaymentPage;

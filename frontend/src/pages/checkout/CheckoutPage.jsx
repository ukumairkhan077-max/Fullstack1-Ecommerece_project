import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import "../../styles/checkout.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal } = useCart();
  const { saveCheckoutInfo, checkoutInfo } = useOrder();

  const [form, setForm] = useState({
    email: checkoutInfo?.email || "",
    firstName: checkoutInfo?.firstName || "",
    lastName: checkoutInfo?.lastName || "",
    address: checkoutInfo?.address || "",
    city: checkoutInfo?.city || "",
    postalCode: checkoutInfo?.postalCode || "",
    country: checkoutInfo?.country || "",
    phone: checkoutInfo?.phone || "",
  });
  const [errors, setErrors] = useState({});

  const shipping = subtotal > 0 && subtotal < 100 ? 9.99 : 0;
  const total = subtotal + shipping;

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add something to your cart before checking out.</p>
          <button className="checkout-empty__btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const req = ["email", "firstName", "lastName", "address", "city", "postalCode", "country", "phone"];
    const newErrors = {};
    req.forEach(field => {
      if (!form[field].trim()) newErrors[field] = "Required";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!validate()) return;
    saveCheckoutInfo(form);
    navigate("/checkout/payment");
  };

  return (
    <>
      <Header />
      <div className="checkout-page">
        <form className="checkout-form" onSubmit={handleContinue} noValidate>
          <h1 className="checkout-title">CHECKOUT</h1>

          <section className="checkout-section">
            <h3>Contact Details</h3>
            <label className="ck-label">Email
              <input
                className={`ck-input ${errors.email ? "ck-input--error" : ""}`}
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="admin@example.com"
              />
              {errors.email && <span className="ck-error">{errors.email}</span>}
            </label>
          </section>

          <section className="checkout-section">
            <h3>Delivery</h3>

            <div className="ck-row">
              <label className="ck-label">First name
                <input
                  className={`ck-input ${errors.firstName ? "ck-input--error" : ""}`}
                  name="firstName" value={form.firstName} onChange={handleChange}
                />
                {errors.firstName && <span className="ck-error">{errors.firstName}</span>}
              </label>
              <label className="ck-label">Last name
                <input
                  className={`ck-input ${errors.lastName ? "ck-input--error" : ""}`}
                  name="lastName" value={form.lastName} onChange={handleChange}
                />
                {errors.lastName && <span className="ck-error">{errors.lastName}</span>}
              </label>
            </div>

            <label className="ck-label">Address
              <input
                className={`ck-input ${errors.address ? "ck-input--error" : ""}`}
                name="address" value={form.address} onChange={handleChange}
              />
              {errors.address && <span className="ck-error">{errors.address}</span>}
            </label>

            <div className="ck-row">
              <label className="ck-label">City
                <input
                  className={`ck-input ${errors.city ? "ck-input--error" : ""}`}
                  name="city" value={form.city} onChange={handleChange}
                />
                {errors.city && <span className="ck-error">{errors.city}</span>}
              </label>
              <label className="ck-label">Postal Code
                <input
                  className={`ck-input ${errors.postalCode ? "ck-input--error" : ""}`}
                  name="postalCode" value={form.postalCode} onChange={handleChange}
                />
                {errors.postalCode && <span className="ck-error">{errors.postalCode}</span>}
              </label>
            </div>

            <label className="ck-label">Country
              <input
                className={`ck-input ${errors.country ? "ck-input--error" : ""}`}
                name="country" value={form.country} onChange={handleChange}
              />
              {errors.country && <span className="ck-error">{errors.country}</span>}
            </label>

            <label className="ck-label">Phone
              <input
                className={`ck-input ${errors.phone ? "ck-input--error" : ""}`}
                name="phone" value={form.phone} onChange={handleChange}
              />
              {errors.phone && <span className="ck-error">{errors.phone}</span>}
            </label>
          </section>

          <button type="submit" className="checkout-continue-btn">
            Continue to Payment
          </button>
        </form>

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

export default CheckoutPage;

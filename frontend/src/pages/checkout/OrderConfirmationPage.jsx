import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import { useOrder } from "../../context/OrderContext";
import "../../styles/checkout.css";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { order, clearOrder } = useOrder();

  // Guard: no order means user navigated here directly
  if (!order) {
    return (
      <>
        <Header />
        <div className="checkout-empty">
          <h2>No recent order found</h2>
          <p>Looks like you haven't completed a checkout yet.</p>
          <button className="checkout-empty__btn" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </>
    );
  }

  const { orderId, orderDate, estimatedDelivery, items, total, paymentMethod, delivery } = order;

  return (
    <>
      <Header />
      <div className="confirmation-page">
        <h1 className="confirmation-title">Thank You for Your Order!</h1>

        <div className="confirmation-card">
          <div className="confirmation-card__top">
            <div>
              <p className="confirmation-orderid">Order ID: {orderId}</p>
              <p className="confirmation-date">Order Date: {formatDate(orderDate)}</p>
            </div>
            <p className="confirmation-eta">
              Estimated Delivery: {formatDate(estimatedDelivery)}
            </p>
          </div>

          <div className="confirmation-items">
            {items.map((item, i) => (
              <div key={i} className="confirmation-item">
                <img src={item.image} alt={item.name} className="confirmation-item__img" />
                <div className="confirmation-item__info">
                  <p className="confirmation-item__name">{item.name}</p>
                  <p className="confirmation-item__meta">
                    {item.color}{item.color && item.size ? " | " : ""}{item.size}
                  </p>
                </div>
                <div className="confirmation-item__right">
                  <p className="confirmation-item__price">${item.price.toFixed(2)}</p>
                  <p className="confirmation-item__qty">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="confirmation-bottom">
            <div>
              <h4>Payment</h4>
              <p>{paymentMethod}</p>
            </div>
            <div>
              <h4>Delivery</h4>
              <p>{delivery?.firstName} {delivery?.lastName}</p>
              <p>{delivery?.address}</p>
              <p>{delivery?.city}{delivery?.city && delivery?.country ? ", " : ""}{delivery?.country}</p>
            </div>
          </div>
        </div>

        <div className="confirmation-total-row">
          <span>Total Paid</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          className="confirmation-continue-btn"
          onClick={() => { clearOrder(); navigate("/"); }}
        >
          Continue Shopping
        </button>
      </div>
      <Footer />
    </>
  );
}

export default OrderConfirmationPage;

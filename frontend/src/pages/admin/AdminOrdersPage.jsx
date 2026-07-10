import { useEffect, useState, Fragment } from "react";
import { useOrder } from "../../context/OrderContext";

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function AdminOrdersPage() {
  const { orders, updateOrderStatus, deleteOrder, refreshOrders } = useOrder();
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState("");

  // Re-fetch from the real backend now that we know an admin is logged in
  // (GET /api/orders requires an admin JWT).
  useEffect(() => {
    refreshOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Delete this order? This cannot be undone.")) return;
    try {
      await deleteOrder(orderId);
    } catch (err) {
      setError(err.message || "Could not delete this order.");
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Order Management</h1>

      {error && <p className="admin-error">{error}</p>}

      {orders.length === 0 ? (
        <p className="admin-empty">No orders yet. Orders placed through checkout will show up here.</p>
      ) : (
        <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <Fragment key={o.orderId}>
                <tr>
                  <td>
                    <button
                      className="admin-btn admin-btn--sm"
                      onClick={() => setExpandedId(expandedId === o.orderId ? null : o.orderId)}
                    >
                      {expandedId === o.orderId ? "▾" : "▸"} #{o.orderId.slice(-8)}
                    </button>
                  </td>
                  <td>{o.customer}</td>
                  <td>${o.total.toFixed(2)}</td>
                  <td>
                    <select
                      className="admin-input admin-input--sm"
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.orderId, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="admin-btn admin-btn--green admin-btn--sm"
                      disabled={o.status === "Delivered"}
                      onClick={() => updateOrderStatus(o.orderId, "Delivered")}
                    >
                      Mark as Delivered
                    </button>
                    <button
                      className="admin-btn admin-btn--red admin-btn--sm"
                      onClick={() => handleDelete(o.orderId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedId === o.orderId && (
                  <tr>
                    <td colSpan={5} style={{ background: "#fafafa" }}>
                      <div style={{ padding: "10px 4px" }}>
                        <p style={{ fontSize: 13, marginBottom: 8 }}>
                          <strong>Payment:</strong> {o.paymentMethod}
                          {o.transactionId && ` — ${o.transactionId}`}
                        </p>
                        {o.delivery && (
                          <p style={{ fontSize: 13, marginBottom: 8 }}>
                            <strong>Ship to:</strong> {o.delivery.address}, {o.delivery.city}, {o.delivery.country}
                          </p>
                        )}
                        <table className="admin-table" style={{ boxShadow: "none" }}>
                          <thead>
                            <tr><th>Item</th><th>Size</th><th>Color</th><th>Qty</th><th>Price</th></tr>
                          </thead>
                          <tbody>
                            {o.items.map((item, idx) => (
                              <tr key={idx}>
                                <td>{item.name}</td>
                                <td>{item.size || "—"}</td>
                                <td>{item.color || "—"}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrdersPage;

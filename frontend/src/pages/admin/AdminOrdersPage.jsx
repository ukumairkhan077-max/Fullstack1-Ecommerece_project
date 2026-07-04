import { useOrder } from "../../context/OrderContext";

const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];

function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrder();

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Order Management</h1>

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
              <tr key={o.orderId}>
                <td>#{o.orderId}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrdersPage;

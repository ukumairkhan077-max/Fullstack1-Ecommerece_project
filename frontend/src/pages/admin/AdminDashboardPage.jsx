import { Link } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import { useProducts } from "../../context/ProductContext";

function AdminDashboardPage() {
  const { orders } = useOrder();
  const { products } = useProducts();

  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Admin Dashboard</h1>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <p className="admin-stat-label">Revenue</p>
          <p className="admin-stat-value">${revenue.toFixed(2)}</p>
        </div>

        <div className="admin-stat-card">
          <p className="admin-stat-label">Total Orders</p>
          <p className="admin-stat-value">{orders.length}</p>
          <Link to="/admin/orders" className="admin-stat-link">Manage Orders</Link>
        </div>

        <div className="admin-stat-card">
          <p className="admin-stat-label">Total Products</p>
          <p className="admin-stat-value">{products.length}</p>
          <Link to="/admin/products" className="admin-stat-link">Manage Products</Link>
        </div>
      </div>

      <h2 className="admin-section-title">Recent Orders</h2>

      {recentOrders.length === 0 ? (
        <p className="admin-empty">No orders yet. Orders placed through checkout will show up here.</p>
      ) : (
        <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.orderId}>
                <td>{o.orderId}</td>
                <td>{o.customer}</td>
                <td>${o.total.toFixed(2)}</td>
                <td>
                  <span className={`admin-status admin-status--${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
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

export default AdminDashboardPage;

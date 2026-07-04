import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

function AdminProductsPage() {
  const { products, deleteProduct } = useProducts();

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Product Management</h1>
        <Link to="/admin/products/new" className="admin-btn admin-btn--green">+ Add Product</Link>
      </div>

      {products.length === 0 ? (
        <p className="admin-empty">No products found.</p>
      ) : (
        <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>SKU</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.sku}</td>
                <td>
                  <Link to={`/admin/products/edit/${p.id}`} className="admin-btn admin-btn--yellow admin-btn--sm">
                    Edit
                  </Link>
                  <button className="admin-btn admin-btn--red admin-btn--sm" onClick={() => handleDelete(p)}>
                    Delete
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

export default AdminProductsPage;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";

function AdminProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, addProduct, updateProduct } = useProducts();

  const isNew = !id;
  const existing = !isNew ? getProduct(id) : null;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
    sku: "",
    sizes: "",
    colors: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name || "",
        description: existing.description || "",
        price: existing.price ?? "",
        countInStock: existing.countInStock ?? "",
        sku: existing.sku || "",
        sizes: (existing.sizes || []).join(", "),
        colors: (existing.colors || []).join(", "),
        imageUrl: existing.images?.[0]?.url || "",
      });
    }
  }, [existing]);

  if (!isNew && !existing) {
    return (
      <div className="admin-page">
        <h1 className="admin-page-title">Product Not Found</h1>
        <button className="admin-btn" onClick={() => navigate("/admin/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, imageUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.sku.trim() || form.price === "" || form.countInStock === "") {
      setError("Product name, price, count in stock, and SKU are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price) || 0,
      discountPrice: existing?.discountPrice,
      countInStock: parseInt(form.countInStock, 10) || 0,
      sku: form.sku.trim(),
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      images: form.imageUrl
        ? [{ url: form.imageUrl, altText: form.name.trim() }]
        : existing?.images || [],
      category: existing?.category || "Top Wear",
      gender: existing?.gender || "Men",
      brand: existing?.brand || "Rabbit",
      rating: existing?.rating || 0,
      numReviews: existing?.numReviews || 0,
    };

    if (isNew) {
      addProduct(payload);
    } else {
      updateProduct(id, payload);
    }
    navigate("/admin/products");
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">{isNew ? "Add Product" : "Edit Product"}</h1>

      <form className="admin-form admin-form--card" onSubmit={handleSubmit} noValidate>
        <label className="admin-label">
          Product Name
          <input className="admin-input" name="name" value={form.name} onChange={handleChange} />
        </label>

        <label className="admin-label">
          Description
          <textarea
            className="admin-input admin-textarea"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label className="admin-label">
          Price
          <input
            className="admin-input"
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label className="admin-label">
          Count in Stock
          <input
            className="admin-input"
            type="number"
            name="countInStock"
            value={form.countInStock}
            onChange={handleChange}
          />
        </label>

        <label className="admin-label">
          SKU
          <input className="admin-input" name="sku" value={form.sku} onChange={handleChange} />
        </label>

        <label className="admin-label">
          Sizes (comma-separated)
          <input
            className="admin-input"
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            placeholder="S, M, L, XL"
          />
        </label>

        <label className="admin-label">
          Colors (comma-separated)
          <input
            className="admin-input"
            name="colors"
            value={form.colors}
            onChange={handleChange}
            placeholder="Black, White"
          />
        </label>

        <label className="admin-label">
          Upload Image
          <input className="admin-input" type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="admin-image-preview" />}

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="button" className="admin-btn" onClick={() => navigate("/admin/products")}>
            Cancel
          </button>
          <button type="submit" className="admin-btn admin-btn--green">
            {isNew ? "Add Product" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductEditPage;

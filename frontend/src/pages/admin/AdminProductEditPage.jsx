import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import api from "../../services/api";

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
    imagePublicId: "",
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

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
        imagePublicId: existing.images?.[0]?.publicId || "",
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

  // Tries to upload the image to Cloudinary via the real backend first
  // (POST /api/upload). If that's not reachable (no backend, or Cloudinary
  // isn't configured), falls back to a local base64 preview — same
  // "hybrid" pattern used throughout this app so the admin panel stays
  // usable without a backend.
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const result = await api.uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: result.url, imagePublicId: result.publicId }));
    } catch {
      // Fall back to a local, base64 preview (won't persist to Cloudinary,
      // but keeps the admin panel usable without a backend/Cloudinary set up)
      const reader = new FileReader();
      reader.onload = () => setForm((prev) => ({ ...prev, imageUrl: reader.result, imagePublicId: "" }));
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
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
        ? [{ url: form.imageUrl, altText: form.name.trim(), publicId: form.imagePublicId || null }]
        : existing?.images || [],
      category: existing?.category || "Top Wear",
      gender: existing?.gender || "Men",
      brand: existing?.brand || "Rabbit",
      rating: existing?.rating || 0,
      numReviews: existing?.numReviews || 0,
    };

    try {
      if (isNew) {
        await addProduct(payload);
      } else {
        // The backend (routes/productAdminRoutes.js) compares the old and
        // new `images` arrays and automatically deletes any old Cloudinary
        // image whose publicId is no longer present — so replacing a photo
        // here cleans up the old one server-side, no extra step needed.
        await updateProduct(id, payload);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.message || "Could not save this product. Please try again.");
    }
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
          <input className="admin-input" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        </label>
        {uploading && <p style={{ fontSize: 13, color: "#777" }}>Uploading…</p>}

        {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="admin-image-preview" />}

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form-actions">
          <button type="button" className="admin-btn" onClick={() => navigate("/admin/products")}>
            Cancel
          </button>
          <button type="submit" className="admin-btn admin-btn--green" disabled={uploading}>
            {isNew ? "Add Product" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductEditPage;

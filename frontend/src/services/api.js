// Central place for all calls to the backend API.
//
// Set VITE_API_URL in a .env file at the frontend root to point at your
// backend (e.g. VITE_API_URL=http://localhost:5000/api). If it's not set,
// this defaults to http://localhost:5000/api for local development.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Reads the JWT saved at login/register (see AuthContext)
function getToken() {
  try {
    return localStorage.getItem("rabbit_token");
  } catch {
    return null;
  }
}

// Wraps fetch() with the API base URL, JSON headers, and the auth token
// (if present). Throws an Error with the backend's message on failure.
async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // some endpoints (e.g. 204s) may not return a JSON body
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }

  return data;
}

// Separate from request() because file uploads use multipart/form-data,
// not JSON — the browser sets the correct Content-Type (with boundary)
// automatically when we pass a FormData body, so we must NOT set our own.
async function uploadRequest(path, formData) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // ignore
  }

  if (!response.ok) {
    throw new Error(data?.message || `Upload failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // ---- Users / Auth ----
  register: (payload) => request("/users/register", { method: "POST", body: payload }),
  login: (payload) => request("/users/login", { method: "POST", body: payload }),
  getProfile: () => request("/users/profile", { auth: true }),
  getUsers: () => request("/users", { auth: true }),
  createUser: (payload) => request("/users", { method: "POST", body: payload, auth: true }),
  updateUser: (id, payload) => request(`/users/${id}`, { method: "PUT", body: payload, auth: true }),
  updateUserRole: (id, role) => request(`/users/${id}/role`, { method: "PUT", body: { role }, auth: true }),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE", auth: true }),

  // ---- Products ----
  getProducts: (query = "") => request(`/products${query}`),
  getProduct: (id) => request(`/products/${id}`),
  getBestsellers: () => request("/products/bestsellers"),
  getNewArrivals: () => request("/products/new-arrivals"),
  createProduct: (payload) => request("/products", { method: "POST", body: payload, auth: true }),
  updateProduct: (id, payload) => request(`/products/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE", auth: true }),

  // ---- Product image upload (Cloudinary) ----
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return uploadRequest("/upload", formData);
  },
  deleteImage: (publicId) => request(`/upload/${encodeURIComponent(publicId)}`, { method: "DELETE", auth: true }),

  // ---- Cart ----
  getCart: (query) => request(`/cart${query}`),
  addToCart: (payload) => request("/cart", { method: "POST", body: payload }),
  updateCartItem: (productId, payload) => request(`/cart/${productId}`, { method: "PUT", body: payload }),
  removeCartItem: (productId, payload) => request(`/cart/${productId}`, { method: "DELETE", body: payload }),
  clearCart: (payload) => request("/cart/clear", { method: "DELETE", body: payload }),

  // ---- Checkout ----
  createCheckout: (payload) => request("/checkout", { method: "POST", body: payload, auth: true }),
  getCheckout: (id) => request(`/checkout/${id}`, { auth: true }),
  payCheckout: (id, payload) => request(`/checkout/${id}/pay`, { method: "PUT", body: payload, auth: true }),
  finalizeCheckout: (id) => request(`/checkout/${id}/finalize`, { method: "POST", auth: true }),

  // ---- Orders ----
  getMyOrders: () => request("/orders/mine", { auth: true }),
  getOrder: (id) => request(`/orders/${id}`, { auth: true }),
  getAllOrders: () => request("/orders", { auth: true }),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: "PUT", body: { status }, auth: true }),
  deleteOrder: (id) => request(`/orders/${id}`, { method: "DELETE", auth: true }),

  // ---- Newsletter ----
  subscribeNewsletter: (email) => request("/newsletter", { method: "POST", body: { email } }),
  getSubscribers: () => request("/newsletter", { auth: true }),
};

export default api;

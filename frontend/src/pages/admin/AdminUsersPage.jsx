import { useState, useEffect } from "react";
import { useUsers } from "../../context/UserContext";

function AdminUsersPage() {
  const { users, addUser, deleteUser, updateUserRole, refreshUsers } = useUsers();

  // Re-fetch from the backend now that we know an admin is logged in
  // (the GET /api/users endpoint requires an admin JWT).
  useEffect(() => {
    refreshUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Name, email, and password are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase())) {
      setError("A user with this email already exists.");
      return;
    }

    try {
      await addUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      setForm({ name: "", email: "", password: "", role: "customer" });
      setError("");
    } catch (err) {
      setError(err.message || "Could not add this user.");
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.name}"?`)) return;
    try {
      await deleteUser(user.id);
    } catch (err) {
      setError(err.message || "Could not delete this user.");
    }
  };

  const handleRoleChange = async (user, role) => {
    try {
      await updateUserRole(user.id, role);
    } catch (err) {
      setError(err.message || "Could not update this user's role.");
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">User Management</h1>

      <div className="admin-card">
        <h3 className="admin-card-title">Add New User</h3>
        <form className="admin-form" onSubmit={handleSubmit} noValidate>
          <label className="admin-label">
            Name
            <input className="admin-input" name="name" value={form.name} onChange={handleChange} />
          </label>

          <label className="admin-label">
            Email
            <input className="admin-input" type="email" name="email" value={form.email} onChange={handleChange} />
          </label>

          <label className="admin-label">
            Password
            <input className="admin-input" type="password" name="password" value={form.password} onChange={handleChange} />
          </label>

          <label className="admin-label">
            Role
            <select className="admin-input" name="role" value={form.role} onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" className="admin-btn admin-btn--green">Add User</button>
        </form>
      </div>

      <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select
                  className="admin-input admin-input--sm"
                  value={u.role}
                  onChange={(e) => handleRoleChange(u, e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button className="admin-btn admin-btn--red admin-btn--sm" onClick={() => handleDelete(u)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminUsersPage;

import { useState, useEffect } from "react";
import api from "../../services/api";

function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.getSubscribers();
        if (!cancelled) setSubscribers(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load subscribers. Is the backend running?");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="admin-page">
      <h1 className="admin-page-title">Newsletter Subscribers</h1>

      {loading && <p className="admin-empty">Loading…</p>}
      {error && <p className="admin-error">{error}</p>}

      {!loading && !error && subscribers.length === 0 && (
        <p className="admin-empty">No subscribers yet.</p>
      )}

      {!loading && !error && subscribers.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s._id}>
                  <td>{s.email}</td>
                  <td>{new Date(s.subscribedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminSubscribersPage;

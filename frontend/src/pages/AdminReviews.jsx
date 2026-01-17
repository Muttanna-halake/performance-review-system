import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminReviews() {
  const [employees, setEmployees] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewerId, setReviewerId] = useState("");
  const [reviewForId, setReviewForId] = useState("");

  const load = async () => {
    const empRes = await axios.get("http://localhost:8080/employees");
    const revRes = await axios.get("http://localhost:8080/reviews");
    setEmployees(empRes.data);
    setReviews(revRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createReview = async () => {
    if (!reviewerId || !reviewForId) return alert("Select both employees");
    if (reviewerId === reviewForId) return alert("Reviewer and Review For cannot be same");

    await axios.post("http://localhost:8080/reviews", {
      reviewerId: Number(reviewerId),
      reviewForId: Number(reviewForId),
    });

    setReviewerId("");
    setReviewForId("");
    load();
  };

  const deleteReview = async (id) => {
    await axios.delete(`http://localhost:8080/reviews/${id}`);
    load();
  };

  const getName = (id) => employees.find((e) => e.id === id)?.name || "Unknown";

  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">Admin Panel</div>
          <div className="nav-actions">
            <Link to="/admin/employees">Back</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div className="page-title">Manage Performance Reviews</div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <select
              style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
              value={reviewerId}
              onChange={(e) => setReviewerId(e.target.value)}
            >
              <option value="">Select Reviewer</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} (ID {e.id})
                </option>
              ))}
            </select>

            <select
              style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
              value={reviewForId}
              onChange={(e) => setReviewForId(e.target.value)}
            >
              <option value="">Select Review For</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} (ID {e.id})
                </option>
              ))}
            </select>

            <button className="btn btn-primary" onClick={createReview}>
              Assign
            </button>
          </div>

          <div className="list">
            {reviews.map((r) => (
              <div className="list-item" key={r.id}>
                <div>
                  <b>Review ID: {r.id}</b>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    Reviewer: {getName(r.reviewerId)} → Reviewing: {getName(r.reviewForId)}
                  </div>
                  <div style={{ fontSize: "13px", marginTop: "4px" }}>
                    Feedback: {r.feedback ? "Submitted" : "Pending"}
                  </div>
                </div>

                <button className="btn btn-secondary" onClick={() => deleteReview(r.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link className="btn btn-primary" to="/">
              Go to Employee View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

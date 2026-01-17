import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/reviews/pending/${id}`)
      .then(res => setReviews(res.data));
  }, [id]);

  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">Performance Review System</div>
          <div className="nav-actions">
            <Link to="/">Back</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <div className="page-title">Pending Reviews</div>
          <div className="sub-title">
            Employee ID: <span className="badge">{id}</span>
          </div>

          {reviews.length === 0 ? (
            <div style={{ color: "#6b7280" }}>
              No pending reviews.
            </div>
          ) : (
            <div className="list">
              {reviews.map(r => (
                <div key={r.id} className="list-item">
                  <div>
                    <div style={{ fontWeight: "700" }}>Review ID: {r.id}</div>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>
                      Submit your feedback for this review
                    </div>
                  </div>

                  <Link className="btn btn-secondary" to={`/feedback/${r.id}`}>
                    Give Feedback
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) {
      alert("Please enter feedback before submitting!");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8080/reviews/feedback", {
        id: Number(id),
        feedback: text,
        reviewerId: 0,
        reviewForId: 0,
      });

      alert("Feedback submitted successfully!");
      setText("");

      //go back to review list page
      navigate(-1);
    } catch (err) {
      console.log("Submit error:", err);
      alert("Error submitting feedback (check backend console)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">Performance Review System</div>
          <div className="nav-actions">
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="page-title">Submit Feedback</div>
          <div className="sub-title">
            Review ID: <span className="badge">{id}</span>
          </div>

          <textarea
            className="textarea"
            placeholder="Write your feedback here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
            <button
              className="btn btn-primary"
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

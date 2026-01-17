import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Employees() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/employees")
      .then(res => setList(res.data));
  }, []);

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
          <div className="page-title">Employees</div>
          <div className="sub-title">Select an employee to see pending reviews.</div>

          <div className="list">
            {list.map(e => (
              <div key={e.id} className="list-item">
                <div>
                  <div style={{ fontWeight: "700" }}>{e.name}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    Employee ID: {e.id}
                  </div>
                </div>

                <Link className="btn btn-primary" to={`/reviews/${e.id}`}>
                  View Reviews
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

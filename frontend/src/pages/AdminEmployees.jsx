import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Load all employees
  const loadEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log("LOAD EMPLOYEES ERROR:", err);
      alert("Failed to load employees! Check backend running or CORS.");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Add employee
  const addEmployee = async () => {
    if (!name.trim()) {
      alert("Enter employee name");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/employees",
        { name: name.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setName("");
      loadEmployees();
    } catch (err) {
      console.log("ADD EMPLOYEE ERROR:", err);
      alert("Add Employee failed! Check backend console.");
    }
  };

  //Start edit mode
  const startEdit = (emp) => {
    setEditId(emp.id);
    setName(emp.name);
  };

  //Cancel edit mode
  const cancelEdit = () => {
    setEditId(null);
    setName("");
  };

  //Update employee
  const updateEmployee = async () => {
    if (!name.trim()) {
      alert("Enter employee name");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/employees/${editId}`,
        { name: name.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEditId(null);
      setName("");
      loadEmployees();
    } catch (err) {
      console.log("UPDATE EMPLOYEE ERROR:", err);
      alert("Update Employee failed! Check backend console.");
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employees/${id}`);
      loadEmployees();
    } catch (err) {
      console.log("DELETE EMPLOYEE ERROR:", err);
      alert(" Delete Employee failed! Check backend console.");
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">Admin Panel</div>
          <div className="nav-actions">
            <Link to="/">Employee View</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="page-title">Manage Employees</div>
          <div className="sub-title">
            Add, update or delete employees (Admin view)
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <input
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {editId ? (
              <>
                <button className="btn btn-secondary" onClick={updateEmployee}>
                  Update
                </button>
                <button className="btn btn-primary" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={addEmployee}>
                Add
              </button>
            )}
          </div>
          <div className="list">
            {employees.length === 0 ? (
              <div style={{ color: "#6b7280" }}>No employees found.</div>
            ) : (
              employees.map((e) => (
                <div className="list-item" key={e.id}>
                  <div>
                    <b>{e.name}</b>
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>
                      ID: {e.id}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => startEdit(e)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => deleteEmployee(e.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          
          <div style={{ marginTop: "20px" }}>
            <Link className="btn btn-primary" to="/admin/reviews">
              Manage Reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

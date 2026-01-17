import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Reviews from "./pages/Reviews";
import Feedback from "./pages/Feedback";
import AdminEmployees from "./pages/AdminEmployees";
import AdminReviews from "./pages/AdminReviews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employee View */}
        <Route path="/" element={<Employees />} />
        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="/feedback/:id" element={<Feedback />} />

        {/* Admin View */}
        <Route path="/admin/employees" element={<AdminEmployees />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function DashboardPlaceholder() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05050b] text-2xl font-bold text-white">
      Dashboard loading...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard/student"
            element={<DashboardPlaceholder />}
          />

          <Route
            path="/dashboard/tutor"
            element={<DashboardPlaceholder />}
          />

          <Route
            path="/dashboard/admin"
            element={<DashboardPlaceholder />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
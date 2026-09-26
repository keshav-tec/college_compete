import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import { getCurrentUser } from "./services/authApi";

// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({
  children,
  allowedRole,
}) {
  const user = getCurrentUser();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    if (user.role === "student") {
      return (
        <Navigate
          to="/student-dashboard"
          replace
        />
      );
    }

    if (user.role === "tutor") {
      return (
        <Navigate
          to="/tutor-dashboard"
          replace
        />
      );
    }

    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin-dashboard"
          replace
        />
      );
    }
  }

  return children;
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==========================================
            PUBLIC
        =========================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ==========================================
            STUDENT
        =========================================== */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute
              allowedRole="student"
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            TUTOR
        =========================================== */}

        <Route
          path="/tutor-dashboard"
          element={
            <ProtectedRoute
              allowedRole="tutor"
            >
              <TutorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            ADMIN
        =========================================== */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              allowedRole="admin"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ==========================================
            UNKNOWN URL
        =========================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
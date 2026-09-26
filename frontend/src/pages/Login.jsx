import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LogIn,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

import { loginUser } from "../services/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(
        email,
        password
      );

      if (!result.success) {
        setError(result.message);
        return;
      }

      // ================================================
      // ROLE BASED REDIRECTION
      // ================================================

      if (result.user.role === "student") {
        navigate("/student-dashboard");
      } else if (result.user.role === "tutor") {
        navigate("/tutor-dashboard");
      } else if (result.user.role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden bg-gradient-to-br from-indigo-600 to-violet-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={28} />

              <span className="text-2xl font-bold">
                PeerConnect
              </span>
            </div>

            <div className="mt-24 max-w-lg">
              <h1 className="text-5xl font-bold leading-tight">
                Learn from peers.
                <br />
                Clear every doubt.
              </h1>

              <p className="mt-6 text-lg leading-8 text-indigo-100">
                Connect with experienced senior students,
                ask academic questions and build your
                learning community.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-indigo-100">
            <ShieldCheck size={20} />
            <span className="text-sm">
              Secure role-based access
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
              <BookOpen
                size={27}
                className="text-indigo-600"
              />

              <span className="text-2xl font-bold text-slate-800">
                PeerConnect
              </span>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-xl sm:p-9">

              <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-800">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Login to continue to your dashboard.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* LOGIN */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                >
                  <LogIn size={18} />

                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>
              </form>

              {/* REGISTER */}
              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* DEMO CREDENTIALS */}
            <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-600">
                Competition Demo Accounts
              </p>

              <div className="space-y-1 text-xs text-slate-600">
                <p>
                  Student: student@test.com / 123456
                </p>

                <p>
                  Tutor: tutor@test.com / 123456
                </p>

                <p>
                  Admin: admin@test.com / 123456
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
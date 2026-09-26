import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getApiErrorMessage } from "../services/authService";

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(form);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05050b] px-5 py-10 text-white">
      <div className="pointer-events-none fixed inset-0 futuristic-grid opacity-50" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Brand side */}
        <div className="hidden lg:block">
          <Link
            to="/"
            className="text-sm font-semibold text-white/50 hover:text-white"
          >
            ← Back to Peerly
          </Link>

          <div className="mt-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/60">
              Peerly network
            </p>

            <h1 className="mt-5 text-6xl font-black leading-none">
              Welcome
              <br />
              <span className="gradient-text">back.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
              Continue your learning journey, connect with peer tutors,
              and clear the next doubt.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-md">
          <div className="glass-strong rounded-[30px] p-7 shadow-2xl sm:p-9">
            <Link
              to="/"
              className="text-lg font-black lg:hidden"
            >
              Peerly
            </Link>

            <div className="mt-8 lg:mt-0">
              <p className="text-[10px] uppercase tracking-[0.25em] text-violet-300/70">
                Sign in
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Access your account
              </h2>

              <p className="mt-2 text-xs text-white/35">
                Enter your credentials to continue.
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-xs leading-5 text-red-300">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <label className="block">
                <span className="text-xs font-semibold text-white/60">
                  Email
                </span>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-400/40"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-white/60">
                  Password
                </span>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-400/40"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/35 hover:text-white"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Log In"}
              </button>
            </form>

            <p className="mt-7 text-center text-xs text-white/30">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-violet-300 hover:text-violet-200"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
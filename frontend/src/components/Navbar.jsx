import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Home", "#home"],
    ["How It Works", "#how-it-works"],
    ["Tutors", "#tutors"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <nav className="glass rounded-2xl px-4 py-3 shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3"
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-violet-300/20 bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-900/40">
                <span className="text-sm font-black text-white">P</span>

                <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-cyan-300/40 blur-md" />
              </div>

              <div>
                <div className="text-base font-black tracking-tight text-white">
                  Peerly
                </div>

                <div className="hidden text-[8px] uppercase tracking-[0.25em] text-white/40 sm:block">
                  Learn together
                </div>
              </div>
            </a>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {links.map(([label, href], index) => (
                <a
                  key={label}
                  href={href}
                  className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
                    index === 0
                      ? "bg-white/[0.08] text-white"
                      : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden items-center gap-2 md:flex">
              <a
                href="/login"
                className="rounded-xl px-4 py-2 text-xs font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                Login
              </a>

              <a
                href="/signup"
                className="group relative overflow-hidden rounded-xl border border-violet-300/20 bg-violet-500/20 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5 hover:bg-violet-500/30"
              >
                <span className="relative z-10">Get Started</span>

                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </div>

            {/* Mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] md:hidden"
              aria-label="Toggle navigation"
            >
              <div className="space-y-1.5">
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
                <span className="block h-px w-5 bg-white" />
              </div>
            </button>
          </div>

          {open && (
            <div className="mt-3 border-t border-white/10 pt-3 md:hidden">
              <div className="flex flex-col gap-1">
                {links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-white/65 hover:bg-white/[0.05] hover:text-white"
                  >
                    {label}
                  </a>
                ))}

                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                  <a
                    href="/login"
                    className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white/70"
                  >
                    Login
                  </a>

                  <a
                    href="/signup"
                    className="rounded-xl bg-violet-500 px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
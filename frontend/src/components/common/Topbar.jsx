import { Menu, Bell } from "lucide-react";

export default function Topbar({ student, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block">
        <h2 className="text-lg font-semibold text-slate-800">
          Student Dashboard
        </h2>

        <p className="text-xs text-slate-400">
          Learn. Ask. Connect. Grow.
        </p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-slate-100">
          <Bell size={20} className="text-slate-600" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        <div className="flex items-center gap-3 border-l pl-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {student?.name}
            </p>

            <p className="text-xs text-slate-400">
              {student?.role}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {student?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </div>
        </div>
      </div>
    </header>
  );
}
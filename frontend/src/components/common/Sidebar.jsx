import {
  LayoutDashboard,
  MessageCircleQuestion,
  Users,
  CalendarDays,
  Gift,
  UserCircle,
  LogOut,
  X,
} from "lucide-react";

export default function Sidebar({
  activeSection,
  setActiveSection,
  mobileOpen,
  setMobileOpen,
  onLogout,
}) {
  const menuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "doubt",
      label: "Ask a Doubt",
      icon: MessageCircleQuestion,
    },
    {
      id: "tutors",
      label: "Find Tutors",
      icon: Users,
    },
    {
      id: "bookings",
      label: "My Bookings",
      icon: CalendarDays,
    },
    {
      id: "rewards",
      label: "My Rewards",
      icon: Gift,
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserCircle,
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-20 items-center justify-between border-b px-6">
          <div>
            <h1 className="text-xl font-bold text-indigo-600">
              Peer<span className="text-slate-800">Connect</span>
            </h1>

            <p className="text-xs text-slate-400">
              Peer Learning Hub
            </p>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  flex w-full items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-medium transition
                  ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
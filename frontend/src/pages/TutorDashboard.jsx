import { useState } from "react";
import {
  BookOpen,
  CalendarDays,
  MessageCircle,
  Star,
  LogOut,
} from "lucide-react";

import { getCurrentUser, logoutUser } from "../services/authApi";

export default function TutorDashboard() {
  const [user] = useState(getCurrentUser());

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="flex h-20 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-2">
          <BookOpen
            className="text-indigo-600"
            size={25}
          />

          <span className="text-xl font-bold text-slate-800">
            PeerConnect
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold">
              {user?.name}
            </p>

            <p className="text-xs text-slate-400">
              Senior Peer Tutor
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl p-2 text-red-500 hover:bg-red-50"
          >
            <LogOut size={19} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-6">

        <section>
          <h1 className="text-2xl font-bold text-slate-800">
            Tutor Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Help students and manage your tutoring sessions.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <Stat
            icon={MessageCircle}
            title="Doubts Answered"
            value="42"
          />

          <Stat
            icon={CalendarDays}
            title="Sessions"
            value="18"
          />

          <Stat
            icon={Star}
            title="Rating"
            value="4.9"
          />

          <Stat
            icon={BookOpen}
            title="Subjects"
            value="4"
          />

        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-slate-800">
            Upcoming Sessions
          </h2>

          <div className="mt-5 space-y-3">

            {[
              ["DSA", "Riya Sharma", "Today • 5:00 PM"],
              ["OS", "Rahul Kumar", "Tomorrow • 6:00 PM"],
              ["DBMS", "Ankit Singh", "Tomorrow • 7:30 PM"],
            ].map((session) => (
              <div
                key={`${session[0]}-${session[1]}`}
                className="flex flex-col justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-semibold text-slate-700">
                    {session[0]}
                  </p>

                  <p className="text-sm text-slate-500">
                    Student: {session[1]}
                  </p>
                </div>

                <span className="text-sm text-indigo-600">
                  {session[2]}
                </span>
              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}

function Stat({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <Icon
        size={22}
        className="text-indigo-600"
      />

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}
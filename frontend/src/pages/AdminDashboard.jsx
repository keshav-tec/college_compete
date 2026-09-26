import { useState } from "react";
import {
  Users,
  MessageCircleQuestion,
  ShieldCheck,
  AlertTriangle,
  LogOut,
  BookOpen,
} from "lucide-react";

import {
  getCurrentUser,
  logoutUser,
} from "../services/authApi";

const initialDoubts = [
  {
    id: 1,
    student: "Riya Sharma",
    subject: "DSA",
    doubt: "Binary tree traversal",
    status: "Pending",
  },
  {
    id: 2,
    student: "Rahul Kumar",
    subject: "OS",
    doubt: "Deadlock prevention",
    status: "Pending",
  },
  {
    id: 3,
    student: "Ankit Singh",
    subject: "DBMS",
    doubt: "Normalization",
    status: "Approved",
  },
];

export default function AdminDashboard() {
  const user = getCurrentUser();

  const [doubts, setDoubts] =
    useState(initialDoubts);

  const handleStatus = (id, status) => {
    setDoubts((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  const pendingCount = doubts.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">

      <header className="flex h-20 items-center justify-between border-b bg-white px-6">

        <div className="flex items-center gap-2">
          <BookOpen
            className="text-indigo-600"
            size={25}
          />

          <span className="text-xl font-bold">
            PeerConnect Admin
          </span>
        </div>

        <div className="flex items-center gap-4">

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">
              {user?.name}
            </p>

            <p className="text-xs text-slate-400">
              Administrator
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
          <h1 className="text-2xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage tutors, doubts and platform activity.
          </p>
        </section>

        {/* STATS */}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <Stat
            icon={Users}
            title="Total Users"
            value="248"
          />

          <Stat
            icon={ShieldCheck}
            title="Verified Tutors"
            value="42"
          />

          <Stat
            icon={MessageCircleQuestion}
            title="Total Doubts"
            value={doubts.length}
          />

          <Stat
            icon={AlertTriangle}
            title="Pending Review"
            value={pendingCount}
          />

        </section>

        {/* MODERATION */}

        <section className="rounded-2xl bg-white shadow-sm">

          <div className="border-b p-6">
            <h2 className="text-lg font-bold">
              Doubt Moderation
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review submitted academic doubts.
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] text-left text-sm">

              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-6 py-4">
                    Student
                  </th>

                  <th className="px-6 py-4">
                    Subject
                  </th>

                  <th className="px-6 py-4">
                    Doubt
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {doubts.map((doubt) => (
                  <tr
                    key={doubt.id}
                    className="border-t"
                  >

                    <td className="px-6 py-4 font-medium">
                      {doubt.student}
                    </td>

                    <td className="px-6 py-4">
                      {doubt.subject}
                    </td>

                    <td className="px-6 py-4">
                      {doubt.doubt}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          doubt.status ===
                          "Approved"
                            ? "bg-green-50 text-green-600"
                            : doubt.status ===
                              "Rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {doubt.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      {doubt.status ===
                      "Pending" ? (
                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleStatus(
                                doubt.id,
                                "Approved"
                              )
                            }
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatus(
                                doubt.id,
                                "Rejected"
                              )
                            }
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white"
                          >
                            Reject
                          </button>

                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          Reviewed
                        </span>
                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>
    </div>
  );
}

function Stat({ icon: Icon, title, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <Icon size={21} />
        </div>
      </div>

    </div>
  );
}
import { Search } from "lucide-react";
import { useState } from "react";

export default function DoubtTable({ doubts }) {
  const [search, setSearch] = useState("");

  const filtered = doubts.filter((doubt) =>
    `${doubt.title} ${doubt.subject} ${doubt.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-slate-800">
            My Doubts
          </h2>

          <p className="text-sm text-slate-500">
            Track questions you have submitted.
          </p>
        </div>

        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doubts..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-indigo-500 sm:w-64"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-400">
          No doubts found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-4">Doubt</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Tutor</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((doubt) => (
                <tr
                  key={doubt.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="max-w-xs px-5 py-4 font-medium text-slate-700">
                    {doubt.title}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {doubt.subject}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {doubt.tutor}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        doubt.status === "Answered"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {doubt.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {doubt.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
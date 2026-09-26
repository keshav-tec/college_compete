import { Star, CalendarCheck, BadgeCheck } from "lucide-react";

export default function TutorCard({ tutor, onBook }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
          {tutor.avatar}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="font-semibold text-slate-800">
              {tutor.name}
            </h3>

            {tutor.verified && (
              <BadgeCheck
                size={17}
                className="text-indigo-500"
              />
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {tutor.subject}
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-amber-500">
              <Star size={14} fill="currentColor" />
              {tutor.rating}
            </span>

            <span className="text-slate-400">
              {tutor.sessions} sessions
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-3">
        <p className="text-xs text-slate-400">
          Next available
        </p>

        <p className="mt-1 text-sm font-medium text-slate-700">
          {tutor.available}
        </p>
      </div>

      <button
        onClick={() => onBook(tutor)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        <CalendarCheck size={17} />
        Book Session
      </button>
    </div>
  );
}
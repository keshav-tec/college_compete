import { CalendarDays, Video } from "lucide-react";

export default function BookingCard({ booking }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <CalendarDays size={21} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            {booking.subject}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            With {booking.tutor}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {booking.date} • {booking.time}
          </p>
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 rounded-xl border border-indigo-200 px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
        <Video size={17} />
        Join Session
      </button>
    </div>
  );
}
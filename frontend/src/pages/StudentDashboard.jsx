import { useEffect, useState } from "react";

import {
  MessageCircleQuestion,
  Users,
  CalendarDays,
  Coins,
  ArrowRight,
} from "lucide-react";

import Sidebar from "../components/common/Sidebar";
import Topbar from "../components/common/Topbar";
import StatCard from "../components/common/StatCard";

import DoubtForm from "../components/student/DoubtForm";
import DoubtTable from "../components/student/DoubtTable";
import TutorCard from "../components/student/TutorCard";
import BookingCard from "../components/student/BookingCard";

import {
  getStudentProfile,
  getTutors,
  getDoubts,
  getBookings,
  submitDoubt,
  bookTutor,
} from "../services/api";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [doubts, setDoubts] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] =
    useState("overview");

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          profileResponse,
          tutorsResponse,
          doubtsResponse,
          bookingsResponse,
        ] = await Promise.all([
          getStudentProfile(),
          getTutors(),
          getDoubts(),
          getBookings(),
        ]);

        setStudent(profileResponse.data);
        setTutors(tutorsResponse.data);
        setDoubts(doubtsResponse.data);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Dashboard loading failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const handleDoubtSubmit = async (doubtData) => {
    const response = await submitDoubt(doubtData);

    if (response.success) {
      setDoubts((previous) => [
        response.data,
        ...previous,
      ]);

      alert(
        "Doubt submitted successfully! We are finding a tutor for you."
      );
    }
  };

  const handleBookTutor = async (tutor) => {
    const response = await bookTutor(tutor.id);

    if (response.success) {
      const newBooking = {
        id: Date.now(),
        tutor: tutor.name,
        subject: tutor.subject,
        date: "Upcoming",
        time: tutor.available,
        status: "Confirmed",
      };

      setBookings((previous) => [
        newBooking,
        ...previous,
      ]);

      alert(response.message);
    }
  };

  const handleLogout = () => {
    // Backend teammate can replace this with:
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={handleLogout}
      />

      <div className="lg:pl-64">
        <Topbar
          student={student}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          {/* =========================================
              OVERVIEW
          ========================================== */}

          {activeSection === "overview" && (
            <>
              <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
                <div className="max-w-2xl">
                  <p className="text-sm font-medium text-indigo-100">
                    Welcome back 👋
                  </p>

                  <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                    Learn from peers. Clear every doubt.
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-indigo-100 sm:text-base">
                    Ask questions, connect with senior students,
                    and make your academic journey easier.
                  </p>

                  <button
                    onClick={() => setActiveSection("doubt")}
                    className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow hover:bg-indigo-50"
                  >
                    Ask a Doubt
                    <ArrowRight size={17} />
                  </button>
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="My Doubts"
                  value={doubts.length}
                  subtitle="Questions submitted"
                  icon={MessageCircleQuestion}
                />

                <StatCard
                  title="Tutors Available"
                  value={tutors.length}
                  subtitle="Verified peer tutors"
                  icon={Users}
                />

                <StatCard
                  title="Upcoming Sessions"
                  value={bookings.length}
                  subtitle="Booked sessions"
                  icon={CalendarDays}
                />

                <StatCard
                  title="Credit Balance"
                  value={student?.credits}
                  subtitle="Learning credits"
                  icon={Coins}
                />
              </section>

              <section>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Recommended Tutors
                    </h2>

                    <p className="text-sm text-slate-500">
                      Connect with experienced students.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveSection("tutors")}
                    className="hidden text-sm font-semibold text-indigo-600 sm:block"
                  >
                    View all →
                  </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {tutors.slice(0, 3).map((tutor) => (
                    <TutorCard
                      key={tutor.id}
                      tutor={tutor}
                      onBook={handleBookTutor}
                    />
                  ))}
                </div>
              </section>

              <section>
                <DoubtTable doubts={doubts} />
              </section>
            </>
          )}

          {/* =========================================
              ASK DOUBT
          ========================================== */}

          {activeSection === "doubt" && (
            <section className="mx-auto max-w-3xl">
              <DoubtForm onSubmit={handleDoubtSubmit} />
            </section>
          )}

          {/* =========================================
              TUTORS
          ========================================== */}

          {activeSection === "tutors" && (
            <section>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">
                  Find a Peer Tutor
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Choose a senior student based on subject,
                  rating and availability.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {tutors.map((tutor) => (
                  <TutorCard
                    key={tutor.id}
                    tutor={tutor}
                    onBook={handleBookTutor}
                  />
                ))}
              </div>
            </section>
          )}

          {/* =========================================
              BOOKINGS
          ========================================== */}

          {activeSection === "bookings" && (
            <section>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">
                  My Bookings
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Your upcoming peer tutoring sessions.
                </p>
              </div>

              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                    <CalendarDays
                      className="mx-auto text-slate-300"
                      size={40}
                    />

                    <p className="mt-3 text-sm text-slate-500">
                      You don't have any bookings yet.
                    </p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                    />
                  ))
                )}
              </div>
            </section>
          )}

          {/* =========================================
              REWARDS
          ========================================== */}

          {activeSection === "rewards" && (
            <section className="mx-auto max-w-2xl">
              <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
                  <Coins
                    size={36}
                    className="text-amber-500"
                  />
                </div>

                <h1 className="mt-5 text-3xl font-bold text-slate-800">
                  {student?.credits} Credits
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Earn credits by helping other students and
                  participating in peer learning.
                </p>
              </div>
            </section>
          )}

          {/* =========================================
              PROFILE
          ========================================== */}

          {activeSection === "profile" && (
            <section className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 border-b pb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                    {student?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h1 className="text-xl font-bold text-slate-800">
                      {student?.name}
                    </h1>

                    <p className="text-sm text-slate-500">
                      {student?.role}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-400">
                      Department
                    </p>

                    <p className="mt-1 font-medium text-slate-700">
                      {student?.department}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Semester
                    </p>

                    <p className="mt-1 font-medium text-slate-700">
                      {student?.semester}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Doubts Solved
                    </p>

                    <p className="mt-1 font-medium text-slate-700">
                      {student?.doubtsSolved}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Credit Balance
                    </p>

                    <p className="mt-1 font-medium text-slate-700">
                      {student?.credits}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
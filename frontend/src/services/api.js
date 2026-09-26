import {
  studentProfile,
  tutors,
  doubts,
  bookings,
} from "../data/mockData";

// ======================================================
// MOCK API SERVICE
// Replace the functions below with real fetch() calls
// when backend APIs are ready.
// ======================================================

const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getStudentProfile() {
  await delay();

  return {
    success: true,
    data: studentProfile,
  };
}

export async function getTutors() {
  await delay();

  return {
    success: true,
    data: tutors,
  };
}

export async function getDoubts() {
  await delay();

  return {
    success: true,
    data: doubts,
  };
}

export async function getBookings() {
  await delay();

  return {
    success: true,
    data: bookings,
  };
}

export async function submitDoubt(doubtData) {
  await delay(700);

  // ================================================
  // REAL BACKEND:
  //
  // return fetch("/api/doubts", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(doubtData),
  // }).then(res => res.json());
  //
  // ================================================

  return {
    success: true,
    data: {
      id: Date.now(),
      ...doubtData,
      status: "Pending",
      tutor: "Finding tutor...",
      date: new Date().toLocaleDateString(),
    },
  };
}

export async function bookTutor(tutorId) {
  await delay(500);

  // REAL BACKEND:
  // POST /api/bookings

  return {
    success: true,
    message: "Tutor session booked successfully!",
    tutorId,
  };
}
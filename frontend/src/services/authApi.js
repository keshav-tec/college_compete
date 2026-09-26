// =====================================================
// AUTH API
// =====================================================
// Currently using mock/local authentication.
//
// IMPORTANT:
// When backend authentication is ready, replace the
// functions in this file with fetch() calls.
//
// The Login/Register components should NOT need to change.
// =====================================================

const USERS_KEY = "peerconnect_users";
const SESSION_KEY = "peerconnect_session";

const defaultUsers = [
  {
    id: 1,
    name: "Keshav Kumar",
    email: "student@test.com",
    password: "123456",
    role: "student",
  },
  {
    id: 2,
    name: "Aman Raj",
    email: "tutor@test.com",
    password: "123456",
    role: "tutor",
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
];

function getUsers() {
  const saved = localStorage.getItem(USERS_KEY);

  if (!saved) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(defaultUsers)
    );

    return defaultUsers;
  }

  return JSON.parse(saved);
}

// =====================================================
// LOGIN
// =====================================================

export async function loginUser(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(sessionUser)
  );

  return {
    success: true,
    user: sessionUser,
  };
}

// =====================================================
// REGISTER
// =====================================================

export async function registerUser({
  name,
  email,
  password,
  role,
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getUsers();

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    role,
  };

  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  return {
    success: true,
    message: "Account created successfully.",
  };
}

// =====================================================
// CURRENT USER
// =====================================================

export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  return JSON.parse(session);
}

// =====================================================
// LOGOUT
// =====================================================

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

// =====================================================
// REAL BACKEND VERSION
// =====================================================
//
// Later your backend teammate can replace loginUser()
// with something like:
//
// export async function loginUser(email, password) {
//   const response = await fetch("http://localhost:3000/api/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
//
//   return response.json();
// }
//
// =====================================================
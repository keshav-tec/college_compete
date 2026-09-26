import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  getMeRequest,
  loginRequest,
} from "../services/authService";

const AuthContext = createContext(null);

const TOKEN_KEY = "peerly_token";
const USER_KEY = "peerly_user";

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSessionStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function getDashboardPath(role) {
  if (role === "student") return "/dashboard/student";
  if (role === "tutor") return "/dashboard/tutor";
  if (role === "admin") return "/dashboard/admin";

  return "/";
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY)
  );

  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);

      if (!storedToken) {
        return;
      }

      try {
        const data = await getMeRequest(storedToken);

        if (cancelled) return;

        setUser(data.user);

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(data.user)
        );
      } catch {
        if (cancelled) return;

        clearSessionStorage();
        setToken(null);
        setUser(null);
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (input) => {
    let data;

    // Used by normal login
    if (!input?.token || !input?.user) {
      data = await loginRequest(input);
    } else {
      // Used by signup after a successful signup response
      data = input;
    }

    const nextToken = data.token;
    const nextUser = data.user;

    if (!nextToken || !nextUser) {
      throw new Error("Invalid authentication response from server.");
    }

    saveSession(nextToken, nextUser);

    setToken(nextToken);
    setUser(nextUser);

    navigate(getDashboardPath(nextUser.role));
  };

  const logout = () => {
    clearSessionStorage();

    setToken(null);
    setUser(null);

    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}
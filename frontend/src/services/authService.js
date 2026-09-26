import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signupRequest = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const loginRequest = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getMeRequest = async (token) => {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getApiErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  if (error.response?.data?.errors) {
    if (Array.isArray(error.response.data.errors)) {
      return error.response.data.errors.join(", ");
    }

    return String(error.response.data.errors);
  }

  if (error.request) {
    return "Unable to connect to the server. Please make sure the backend is running.";
  }

  return error.message || "Something went wrong. Please try again.";
};
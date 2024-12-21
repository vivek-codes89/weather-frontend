import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Add 'Bearer ' prefix
  }
  return config;
});

// Auth API
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
export const fetchUserDetails = () => api.get("/auth/user");

// Weather API
export const fetchWeather = (lat, lon) =>
  api.get(`weather/weather`, {
    params: {
      lat: lat,
      lon: lon,
    },
  });
export const fetchLogs = () => api.get("/weather/logs");

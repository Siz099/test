import axios from "axios";
import { API_URL } from "../config/constants";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// For demo purposes, we'll simulate API calls
const simulateApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const authService = {
  async login(email, password) {
    try {
      // In a real app, you would make an API call here
      // const response = await api.post('/auth/login', { email, password });

      // For demo purposes, we'll simulate a successful login
      if (email === "demo@example.com" && password === "password") {
        const user = {
          id: "1",
          name: "Demo User",
          email: "demo@example.com",
        };

        // Store token and user data
        localStorage.setItem("token", "demo-token");
        localStorage.setItem("user", JSON.stringify(user));

        return simulateApiCall(user);
      }

      throw new Error("Invalid email or password");
    } catch (error) {
      throw error;
    }
  },

  async register(name, email, password) {
    try {
      // In a real app, you would make an API call here
      // const response = await api.post('/auth/register', { name, email, password });

      // For demo purposes, we'll simulate a successful registration
      const user = {
        id: Date.now().toString(),
        name,
        email,
      };

      // Store token and user data
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("user", JSON.stringify(user));

      return simulateApiCall(user);
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      // In a real app, you would validate the token with the server
      // const response = await api.get('/auth/me');

      // For demo purposes, we'll check localStorage
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        throw new Error("Not authenticated");
      }

      return simulateApiCall(JSON.parse(userData));
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

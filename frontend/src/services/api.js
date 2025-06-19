import axios from "axios";
import VenueAddTest from "../components/VenueAddTest";

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle auth tokens if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with an error status code
      console.error("API Response Error:", error.response.data);

      // Handle authentication errors
      if (error.response.status === 401) {
        // Clear token and redirect to login if needed
        localStorage.removeItem("auth_token");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Request Error:", error.request);
    } else {
      // Something else caused the error
      console.error("API Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Auth API services
const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      // Store token if received
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  signup: async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new partner
  partnerSignup: async (partnerData) => {
    try {
      const response = await api.post("/auth/partner-signup", partnerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
addVenue: async (venueData) => {
    try {
      const response = await api.post("/admin/venues/new", venueData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  listVenue: async (venueData) => {
    try {
      const response = await api.get("/admin/venues", venueData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  

  // Reset password
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("auth_token");
    // You could also call an API endpoint to invalidate the token on the server
    // return api.post("/auth/logout")
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("auth_token");
  },
};

export { api, authService };

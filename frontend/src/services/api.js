import axios from "axios";

// Axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to automatically attach jwtToken
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Response Error:", error.response.data);
      if (error.response.status === 401) {
        localStorage.removeItem("jwtToken");
      }
    } else if (error.request) {
      console.error("API Request Error:", error.request);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Auth API services
const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("jwtToken", response.data.token);
    }
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },

  partnerSignup: async (partnerData) => {
    const response = await api.post("/auth/partner-signup", partnerData);
    return response.data;
  },

  requestPasswordReset: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("jwtToken");
  },

  isAuthenticated: () => !!localStorage.getItem("jwtToken"),
};

// Venue API services
const venueService = {
  addVenue: async (venueData) => {
    const response = await api.post("/admin/venues/new", venueData);
    return response.data;
  },

  listVenue: async () => {
    const response = await api.get("/admin/venues");
    return response.data;
  },

  deleteVenue: async (id) => {
    const response = await api.delete(`/admin/venues/delete/${id}`);
    return response.data;
  },
};

// User API services
const userService = {
  listUsers: async () => {
    const response = await api.get("/admin/users");
    return response.data;
  },

  addUser: async (userData) => {
    const response = await api.post("/admin/users/new", userData);
    return response.data;
  },

  getUser: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/update/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/delete/${id}`);
    return response.data;
  },

  changeUserStatus: async (id, status) => {

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.patch(`/admin/users/status/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

const partnerService = {
  listPartners: async () => {
    try {
      const response = await api.get("/admin/partners");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPartner: async (id) => {
    try {
      const response = await api.get(`/admin/partners/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addPartner: async (partnerData) => {
    try {
      const response = await api.post("/admin/partners/new", partnerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePartner: async (id, partnerData) => {
    try {
      const response = await api.put(`/admin/partners/update/${id}`, partnerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletePartner: async (id) => {
    try {
      const response = await api.delete(`/admin/partners/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updatePartnerStatus: async (id, status) => {
    try {
      const response = await api.patch(`/admin/partners/status/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { api, authService, venueService, userService, partnerService };

// In your services/api.js file
const adduserService = {
  // ... other user service methods
  
  createUser: async (userData) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.post('/admin/users', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }

    const response = await api.patch(`/admin/users/status/${id}`, { status });
    return response.data;

  },
};

// Additional user creation service (if needed separately)
const adduserService = {
  createUser: async (userData) => {
    const response = await api.post("/admin/users", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};

export { api, authService, venueService, userService, adduserService };

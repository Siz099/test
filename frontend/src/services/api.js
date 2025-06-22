import axios from "axios";

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


//Venue API services
const venueService={
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

  deleteVenue: async (id) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await api.delete(`/admin/venues/delete/${id}`, {
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

// export { api, authService, venueService };

// User API services
const userService = {
  // Get all users
  listUsers: async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add new user
  addUser: async (userData) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.post("/admin/users/new", userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user details
  getUser: async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.get(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.put(`/admin/users/update/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await api.delete(`/admin/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Change user status (activate/deactivate)
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
  },
  
  // ... other methods
};

export { adduserService };
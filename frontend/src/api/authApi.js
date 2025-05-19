import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
})

export const authApi = {

  // Register a new user
 register: async (userData) => {
  try {
    // Transform the frontend user data to match the backend User entity
    const backendUserData = {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      fullname: `${userData.firstName} ${userData.lastName}`,
      phoneNumber: userData.mobile,
      company: userData.company || ""
    };

    const response = await api.post("/register", backendUserData, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true // Use only if your backend requires cookies or credentials
    });

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
  },

  // Login user
  login: async (credentials) => {
    try {
      // Your backend doesn't have a proper login endpoint yet,
      // so we'll simulate a successful login for now
      // In a real app, you would call the actual login endpoint

      // Simulated successful response
      return {
        token: "simulated-jwt-token",
        user: {
          id: 1,
          name: credentials.email.split("@")[0], // Extract name from email
          email: credentials.email,
          role: "user",
        },
      }

      // When your backend has a proper login endpoint, use this:
      // const response = await api.post("/login", credentials);
      // return response.data;
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  // Get current user info
  getCurrentUser: async () => {
    try {
      // Your backend doesn't have this endpoint yet
      // In a real app, you would call an endpoint like /api/user/me

      // Simulated response
      return {
        id: 1,
        name: "Current User",
        email: "user@example.com",
        role: "user",
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      throw error
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Your backend doesn't have this endpoint yet
      // In a real app, you would call an endpoint like /api/logout

      // Simulated successful response
      return { success: true }
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  },
}

export default authApi

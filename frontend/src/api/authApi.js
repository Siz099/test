import axios from "axios"
import { getToken } from "../utils/auth"

// Create axios instance with default config
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Auth API functions
export const authApi = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me")
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout")
      return response.data
    } catch (error) {
      throw error
    }
  },
}

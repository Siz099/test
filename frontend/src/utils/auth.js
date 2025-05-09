// Token management functions

// Store JWT token in localStorage
export const setToken = (token) => {
  localStorage.setItem("token", token)
}

// Get JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token")
}

// Remove JWT token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token")
}

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const expiryTime = payload.exp * 1000 // Convert to milliseconds
    return Date.now() >= expiryTime
  } catch (error) {
    return true
  }
}

// Get user info from token
export const getUserFromToken = (token) => {
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    }
  } catch (error) {
    return null
  }
}

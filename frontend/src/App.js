"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import LoginPage from "./components/auth/login-page"
import SignupPage from "./components/auth/signup-page"
import PartnerSignupPage from "./components/auth/partner-signup-page"
import HomePage from "./components/HomePage"
import AdminPanel from "./components/admin/Adminpanel"
import Dashboard from "./components/Dashboard"
import VenueManagement from "./components/VenueManagement"
import VenuePage from "./components/VenuePage"
import VenueAddTest from "./components/VenueAddTest"
import Header from "./components/Header"
import Footer from "./components/Footer"
// Import our enhanced notifications component
import NotificationsPage from "./components/notification-page"
import "./styles/auth.css"
import "./App.css"

function App() {
  console.log("App rendering")

  // Simple auth state management
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // Check auth status on app load
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user")

    if (token) {
      setIsLoggedIn(true)
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Error parsing user data:", error)
          // Clear invalid data
          localStorage.removeItem("user")
        }
      }
    }
  }, [])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    console.log("User logged out")
  }

  // Login function (call this from your login page)
  const handleLogin = (userData, token) => {
    localStorage.setItem("auth_token", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setIsLoggedIn(true)
    setUser(userData)
    console.log("User logged in:", userData)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Routes with Header */}
          <Route
            path="/home"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} hasNotifications={true} />
                <div className="page-content">
                  <HomePage />
                </div>
              </>
            }
          />
          <Route
            path="/venues"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} hasNotifications={true} />
                <div className="page-content">
                  <VenuePage />
                </div>
              </>
            }
          />
          <Route
            path="/notifications"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} hasNotifications={true} />
                <div className="page-content notifications-page-wrapper">
                  <NotificationsPage />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Auth routes without Header */}
          <Route
            path="/login"
            element={
              <div className="auth-container">
                <LoginPage onLogin={handleLogin} />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="auth-container">
                <SignupPage />
              </div>
            }
          />
          <Route
            path="/partner-signup"
            element={
              <div className="auth-container">
                <PartnerSignupPage />
              </div>
            }
          />

          {/* Admin routes without Header (has its own navigation) */}
          <Route path="/Adminpanel" element={<AdminPanel />} />
          <Route path="/admin/*" element={<AdminPanel />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="venues" element={<VenueManagement />} />
          </Route>
          <Route path="/admin/venues/new" element={<VenueAddTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

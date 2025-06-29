"use client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./components/auth/login-page";
import SignupPage from "./components/auth/signup-page";
import PartnerSignupPage from "./components/auth/partner-signup-page";
import HomePage from "./components/HomePage";
import AdminPanel from "./components/admin/AdminPanel";
import Dashboard from "./components/admin/Dashboard";
import VenueManagement from "./components/admin/VenueManagement";
import VenuePage from "./components/VenuePage";
import VenueBooking from "./components/VenueBooking";
import VenueAddTest from "./components/admin/VenueAddTest";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotificationsPage from "./components/notification-page";
import UserManagement from "./components/admin/UserManagement";
import AddUsers from "./components/admin/AddUsers";
import PartnerManagement from "./components/admin/PartnerManagement";
import ProfilePage from "./components/ProfilePage";
import ContactPage from "./components/ContactPage";
import AboutUs from "./components/about-us";

import "./styles/auth.css";
import "./App.css";

function App() {
  console.log("App rendering");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    console.log("User logged out");
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    console.log("User logged in:", userData);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/Adminpanel"
            element={
              <div className="auth-container">
                <AdminPanel />
              </div>
            }
          />
        
         
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/admin/*"
          element={<AdminPanel />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="venues" element={<VenueManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/new" element={<AddUsers />} />
          <Route path="partners" element={<PartnerManagement />} />
        </Route>
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
            path="/venue-booking"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} hasNotifications={true} />
                <div className="page-content">
                  <VenueBooking />
                </div>
              </>
            }
          />
          <Route
            path="/user-profile"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} hasNotifications={true} />
                <div className="page-content">
                  <ProfilePage />
                </div>
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} hasNotifications={true} />
                <div className="page-content">
                  <ContactPage />
                </div>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} hasNotifications={true} />
                <div className="page-content">
                  <AboutUs />
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
          <Route
            path="/Adminpanel"
            element={<AdminPanel />}
          />
          <Route path="/admin/*" element={<AdminPanel />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="venues" element={<VenueManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="users/new" element={<AddUsers />} />
              <Route path="partners" element={<PartnerManagement />} />
            
          </Route>
          <Route path="/admin/venues/new" element={<VenueAddTest />} />


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
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
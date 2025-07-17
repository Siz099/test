"use client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./components/auth/login-page";
import SignupPage from "./components/auth/signup-page";
import PartnerSignupPage from "./components/auth/partner-signup-page";
import HomePage from "./components/users/HomePage";
import AdminPanel from "./components/admin/Adminpanel";
import Dashboard from "./components/admin/Dashboard";
import VenueManagement from "./components/admin/VenueManagement";
import VenuePage from "./components/users/VenuePage";
import VenueBooking from "./components/users/VenueBooking";
import VenueAddTest from "./components/admin/VenueAddTest";
import Header from "./components/users/Header";
import Footer from "./components/users/Footer";
import NotificationsPage from "./components/users/notification-page";
import UserManagement from "./components/admin/UserManagement";
import AddUsers from "./components/admin/AddUsers";
import PartnerManagement from "./components/admin/PartnerManagement";
import ProfilePage from "./components/users/ProfilePage";
import ContactPage from "./components/users/ContactPage";
import AboutUs from "./components/users/about-us";
import Booking from "./components/admin/Booking";
import Notification from "./components/admin/Notification";
import Profile from "./components/admin/Profile";
import PartnerAddTest from "./components/admin/PartnerAddTest";
import EditPartner from "./components/admin/EditPartner";
import EditVenue from "./components/admin/EditVenue";


import "./styles/auth.css";
import "./App.css";
import EditUsers from "./components/admin/EditUsers";
import ViewUser from "./components/admin/ViewUsers";
import ViewPartner from "./components/admin/ViewPartners";
import ViewVenue from "./components/admin/ViewVenue";
import AddBook from "./components/admin/AddBooking";


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

          <Route path="/admin/*" element={<AdminPanel />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="venues" element={<VenueManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="users/new" element={<AddUsers />} />
            <Route path="partners" element={<PartnerManagement />} />
            <Route path="bookings" element={<Booking />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="profile" element={<Profile />} />
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
          <Route path="/admin/venues/new" element={<VenueAddTest />} />
          <Route path="/admin/partners/new" element={<PartnerAddTest />} />
       <Route path="/admin/users/edit/:userId" element={<EditUsers />} />
    <Route path="/admin/partners/edit/:partnerId" element={<EditPartner />} />
      <Route path="/admin/venues/edit/:id" element={<EditVenue />} />
      <Route path="/admin/users/:userId" element={<ViewUser />} />
      <Route path="/admin/partners/:partnerId" element={<ViewPartner/>} />
      <Route path="/admin/venues/:id" element={<ViewVenue/>} />
      <Route path="/admin/bookings/new" element={<AddBook/>} />

{/*User routing */}
      <Route path="/user/home" element={<HomePage/>} />



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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

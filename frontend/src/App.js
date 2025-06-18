import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/login-page";
import SignupPage from "./components/auth/signup-page";
import PartnerSignupPage from "./components/auth/partner-signup-page";
import HomePage from "./components/HomePage";
import AdminPanel from "./components/admin/Adminpanel";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import VenueManagement from "./components/VenueManagement";
import VenuePage from "./components/VenuePage";
import "./styles/auth.css";
import "./App.css";
function App() {
  console.log("App rendering");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/venues" element={<VenuePage />} />
        <Route
          path="/login"
          element={
            <div className="auth-container">
              <LoginPage />
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
          <Route
          path="/Adminpanel"
          element={
            <div className="auth-container">
              <AdminPanel />
            </div>
          }
        />
        
          
         
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/admin/*"
          element={<AdminPanel />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="venues" element={<VenueManagement />} />
        </Route>

    {/* <div className="app-container">
      <Sidebar />
      <Dashboard />
    </div> */}

      </Routes>
    </BrowserRouter>

    
  );
}

export default App;

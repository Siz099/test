import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/login-page";
import SignupPage from "./components/auth/signup-page";
import PartnerSignupPage from "./components/auth/partner-signup-page";
import HomePage from "./components/HomePage";
import "./styles/auth.css";

function App() {
  console.log("App rendering");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
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
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

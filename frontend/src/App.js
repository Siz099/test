import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/login-page";
import SignupPage from "./components/auth/signup-page";
import PartnerSignupPage from "./components/auth/partner-signup-page";
import "./styles/auth.css";

function App() {
  console.log("App rendering");
  return (
    <BrowserRouter>
      <div className="auth-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/partner-signup" element={<PartnerSignupPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

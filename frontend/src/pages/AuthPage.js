"use client"
import loginIllustration from '../images/login-illustration.png';
import signupIllustration from '../images/signup-illustration.png';
import { useState, useRef } from "react"
import LoginForm from "../components/auth/loginForm"
import RegisterForm from "../components/auth/RegisterForm"
import "../styles/AuthPage.css"

const AuthPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true)
  const loginFormRef = useRef(null)
  const registerFormRef = useRef(null)

  const toggleForm = () => {
    // Reset any error states when switching forms
    if (isLoginActive) {
      // Reset login form errors
      if (loginFormRef.current) {
        loginFormRef.current.resetErrors()
      }
    } else {
      // Reset register form errors
      if (registerFormRef.current) {
        registerFormRef.current.resetErrors()
      }
    }
    setIsLoginActive(!isLoginActive)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className={`forms-container ${isLoginActive ? "" : "signup-active"}`}>
          {/* Login Side */}
          <div className="login-side">
            <div className="login-illustration">
              <img src={loginIllustration || "/placeholder.svg"} alt="Login illustration" />
            </div>
            <div className="login-form-wrapper">
              <LoginForm ref={loginFormRef} onSignupClick={toggleForm} />
            </div>
          </div>

          {/* Signup Side */}
          <div className="signup-side">
            <div className="signup-form-wrapper">
              <RegisterForm ref={registerFormRef} onLoginClick={toggleForm} />
            </div>
            <div className="signup-illustration">
              <img src={signupIllustration || "/placeholder.svg"} alt="Sign Up illustration" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage

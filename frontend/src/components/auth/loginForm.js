"use client"

import { useState, forwardRef, useImperativeHandle } from "react"
// import { useNavigate } from "react-router-dom"
import { authApi } from "../../api/authApi"
import { setToken } from "../../utils/auth"
import "../../styles/LoginForm.css"

const LoginForm = forwardRef(({ onSignupClick }, ref) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  // const navigate = useNavigate()

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    resetErrors: () => {
      setError("")
    },
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Invalid username or password")
      return
    }

    setLoading(true)
    try {
      const response = await authApi.login({ email, password })
      setToken(response.token)
      console.log("Login successful:", response)
      // You would typically redirect here
      // navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setError("Invalid username or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-form-container">
      <h2 className="login-title">Login into your account</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email ID :</label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError("")
              }}
              placeholder="info@privatetechnologies.com"
              className="form-input"
            />
            <span className="input-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError("")
              }}
              placeholder="Enter your password"
              className="form-input"
            />
            <span className="input-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
          </div>
        </div>

        <div className="form-footer">
          {error && <span className="error-message">{error}</span>}
          <a href="/" className="forgot-password">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login now"}
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button type="button" className="signup-button" onClick={onSignupClick}>
          Signup now
        </button>
      </form>
    </div>
  )
})

export default LoginForm

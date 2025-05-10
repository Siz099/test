"use client"

import { useState, forwardRef, useImperativeHandle } from "react"
// import { useNavigate } from "react-router-dom"
import { authApi } from "../../api/authApi"
import { setToken } from "../../utils/auth"
import "../../styles/RegisterForm.css"

const RegisterForm = forwardRef(({ onLoginClick }, ref) => {
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    company: "",
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    company: "",
  })

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    resetErrors: () => {
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        company: "",
      })
    },
  }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return value ? "" : "Enter your First Name"
      case "lastName":
        return value ? "" : "Enter Your Last Name"
      case "email":
        return value ? "" : "Enter your Email"
      case "mobile":
        return value ? "" : "Enter Your Contact Number"
      case "password":
        return value ? "" : "Enter Your Password"
      case "confirmPassword":
        return value ? (value === formData.password ? "" : "Passwords do not match") : "Confirm Password"
      case "company":
        return value ? "" : "Enter Your Company Name"
      default:
        return ""
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const errorMessage = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const newErrors = {}
    let hasError = false

    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key])
      newErrors[key] = errorMessage
      if (errorMessage) hasError = true
    })

    setErrors(newErrors)

    if (hasError) return

    setLoading(true)
    try {
      const response = await authApi.register(formData)
      setToken(response.token)
      // Instead of navigating, we'll switch to the login form
      onLoginClick()
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-form-container">
      <h2 className="register-title">Sign up into your account</h2>

      <form onSubmit={onSubmit} className="register-form">
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="firstName">First Name :</label>
            <div className="input-container">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your name..."
                className="form-input"
              />
              {errors.firstName && <div className="field-error">{errors.firstName}</div>}
            </div>
          </div>

          <div className="form-col">
            <label htmlFor="lastName">Last Name :</label>
            <div className="input-container">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your name..."
                className="form-input"
              />
              {errors.lastName && <div className="field-error">{errors.lastName}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label htmlFor="email">Email ID :</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="info@xyz.com"
                className="form-input"
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
          </div>

          <div className="form-col">
            <label htmlFor="mobile">Mobile No. :</label>
            <div className="input-container">
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+977 - 98596 58000"
                className="form-input"
              />
              {errors.mobile && <div className="field-error">{errors.mobile}</div>}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label htmlFor="password">Password :</label>
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="xxxxxxxxxx"
                className="form-input"
              />
              {errors.password && <div className="field-error">{errors.password}</div>}
            </div>
          </div>

          <div className="form-col">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="input-container">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="xxxxxxxxxx"
                className="form-input"
              />
              {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="company">Company Name :</label>
          <div className="input-container">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter company name ..."
              className="form-input"
            />
            {errors.company && <div className="field-error">{errors.company}</div>}
          </div>
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <div className="login-link">
          Already have an account?{" "}
          <button type="button" className="text-link" onClick={onLoginClick}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
})

export default RegisterForm

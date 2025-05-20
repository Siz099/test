"use client";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "./auth-card";

// Animation variants
const formControlVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Define validateForm as a useCallback to avoid dependency issues
  const validateForm = useCallback(() => {
    const newErrors = {}; // Create a new object instead of spreading errors
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]); // Remove errors from dependency array

  // Validate form on input change
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      password: true,
    });

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Login attempt with:", formData);

        // Success animation before alert
        await new Promise((resolve) => setTimeout(resolve, 300));
        alert("Login successful!");
        // Navigate to dashboard or home page
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({
          ...errors,
          general: "Login failed. Please check your credentials and try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    console.log("Navigating to signup page");
    navigate("/signup");
  };

  const handlePartnerSignupClick = (e) => {
    e.preventDefault();
    console.log("Navigating to partner signup page");
    navigate("/partner-signup");
  };

  return (
    <AuthCard
      title="Login into your account"
      imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loginimage-6La9YSxiZw3oVG0Y6bpndXqT9zUHGM.png"
      imageAlt="Mountain landscape with lake reflection"
    >
      <form onSubmit={handleSubmit} noValidate>
        <AnimatePresence>
          {errors.general && (
            <motion.div
              className="error-banner"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle size={16} />
              <span>{errors.general}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="form-group"
          variants={formControlVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <label
            htmlFor="email"
            className={touched.email && errors.email ? "text-error" : ""}
          >
            Email Id <span className="required">*</span>
          </label>
          <div
            className={`input-container ${
              touched.email && errors.email ? "input-error" : ""
            }`}
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              type="email"
              id="email"
              name="email"
              placeholder="info@provistechnologies.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && !errors.email ? "input-valid" : ""}
              required
            />
            <Mail className="input-icon" size={20} />
            <AnimatePresence>
              {touched.email && !errors.email && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="valid-icon" size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {touched.email && errors.email && (
              <motion.p
                className="error-message"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="form-group"
          variants={formControlVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <label
            htmlFor="password"
            className={touched.password && errors.password ? "text-error" : ""}
          >
            Password <span className="required">*</span>
          </label>
          <div
            className={`input-container ${
              touched.password && errors.password ? "input-error" : ""
            }`}
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.password && !errors.password ? "input-valid" : ""
              }
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <AnimatePresence>
              {touched.password && !errors.password && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="valid-icon" size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {touched.password && errors.password && (
              <motion.p
                className="error-message"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.password}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="form-links"
          variants={formControlVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <motion.button
            className="partner-link-button"
            type="button"
            onClick={handlePartnerSignupClick}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
          >
            Want to be partner?
          </motion.button>
          <motion.button
            className="forgot-password"
            type="button"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Forgot password?
          </motion.button>
        </motion.div>

        <motion.button
          className={`auth-button primary-button ${
            isSubmitting ? "button-loading" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          custom={4}
        >
          {isSubmitting ? "Logging in..." : "Login now"}
        </motion.button>

        <motion.div
          className="divider"
          variants={formControlVariants}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <span className="divider-line"></span>
          <span className="divider-text">OR</span>
          <span className="divider-line"></span>
        </motion.div>

        <motion.button
          className="auth-button secondary-button"
          type="button"
          onClick={handleSignupClick}
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          custom={6}
        >
          Signup now
        </motion.button>
      </form>
    </AuthCard>
  );
}

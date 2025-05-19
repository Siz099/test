"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validation";
import mountainLake from "../images/login-illustration.png";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  // Real-time validation
  const handleValuesChange = (changedValues) => {
    const newErrors = { ...validationErrors };

    if ("email" in changedValues) {
      newErrors.email = validateEmail(changedValues.email);
    }

    if ("password" in changedValues) {
      newErrors.password = validatePassword(changedValues.password);
    }

    setValidationErrors(newErrors);
  };

  const handleSubmit = async (values) => {
    // Validate all fields before submission
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);

    if (emailError || passwordError) {
      setValidationErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="login-image-section">
        <img
          src={mountainLake || "/placeholder.svg"}
          alt="Mountain lake"
          className="login-image"
        />
      </div>
      <div className="login-form-section">
        <div className="login-form-container">
          <h2 className="login-title">Login into your account</h2>

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="login-form"
            onValuesChange={handleValuesChange}
          >
            <Form.Item
              label="Email Id :"
              name="email"
              validateStatus={validationErrors.email ? "error" : ""}
              rules={[{ required: true, message: "" }]}
            >
              <div className="input-container">
                <Input placeholder="info@providetechnologies.com" />
                <button type="button" className="icon-button email-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="#A0A0A0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6L12 13L2 6"
                      stroke="#A0A0A0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </Form.Item>
            {validationErrors.email && (
              <div className="error-message validation-error">
                {validationErrors.email}
              </div>
            )}

            <Form.Item
              label="Password"
              name="password"
              validateStatus={validationErrors.password ? "error" : ""}
              rules={[{ required: true, message: "" }]}
            >
              <div className="input-container">
                <Input.Password placeholder="Enter your password" />
                <button type="button" className="icon-button password-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                      stroke="#A0A0A0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.27002 13C2.19002 9.61 5.76002 7 12 7C18.24 7 21.82 9.61 22.73 13C21.82 16.39 18.24 19 12 19C5.76002 19 2.19002 16.39 1.27002 13Z"
                      stroke="#A0A0A0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </Form.Item>
            {validationErrors.password && (
              <div className="error-message validation-error">
                {validationErrors.password}
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="password-options">
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-button"
            >
              Login now
            </Button>

            <div className="divider-container">
              <Divider className="custom-divider">OR</Divider>
            </div>

            <Button onClick={handleSignupClick} className="signup-button">
              Signup now
            </Button>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;

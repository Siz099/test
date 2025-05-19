"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateMobile,
  validateConfirmPassword,
} from "../utils/validation";
import PasswordStrengthMeter from "../components/auth/PasswordStrengthMeter";
import beachImage from "../images/signup-illustration.png";
import "../styles/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // For password strength meter
  const [password, setPassword] = useState("");

  // Real-time validation
  const handleValuesChange = (changedValues) => {
    const newErrors = { ...validationErrors };
    const allValues = form.getFieldsValue();

    if ("firstName" in changedValues) {
      newErrors.firstName = validateName(changedValues.firstName);
    }

    if ("lastName" in changedValues) {
      newErrors.lastName = validateName(changedValues.lastName);
    }

    if ("email" in changedValues) {
      newErrors.email = validateEmail(changedValues.email);
    }

    if ("mobile" in changedValues) {
      newErrors.mobile = validateMobile(changedValues.mobile);
    }

    if ("password" in changedValues) {
      newErrors.password = validatePassword(changedValues.password);
      setPassword(changedValues.password);

      // Also validate confirm password if it exists
      if (allValues.confirmPassword) {
        newErrors.confirmPassword = validateConfirmPassword(
          changedValues.password,
          allValues.confirmPassword
        );
      }
    }

    if ("confirmPassword" in changedValues) {
      newErrors.confirmPassword = validateConfirmPassword(
        allValues.password,
        changedValues.confirmPassword
      );
    }

    setValidationErrors(newErrors);
  };

  const handleSubmit = async (values) => {
    // Validate all fields before submission
    const firstNameError = validateName(values.firstName);
    const lastNameError = validateName(values.lastName);
    const emailError = validateEmail(values.email);
    const mobileError = validateMobile(values.mobile);
    const passwordError = validatePassword(values.password);
    const confirmPasswordError = validateConfirmPassword(
      values.password,
      values.confirmPassword
    );

    const newErrors = {
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      mobile: mobileError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (hasErrors) {
      setValidationErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await register(
        values.firstName + " " + values.lastName,
        values.email,
        values.password
      );
      navigate("/dashboard");
    } catch (err) {
      // If server returns specific validation errors, you can set them here
      setValidationErrors({
        firstName: "Enter your First Name",
        lastName: "Enter your Last Name",
        email: "Enter your Email",
        mobile: "Enter your Contact Number",
        password: "Enter your Password",
        confirmPassword: "Confirm Password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="signup-form-section">
        <div className="signup-form-container">
          <h2 className="signup-title">Sign up into your account</h2>

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="signup-form"
            onValuesChange={handleValuesChange}
          >
            <div className="form-row">
              <div className="form-col">
                <Form.Item
                  label="First Name :"
                  name="firstName"
                  validateStatus={validationErrors.firstName ? "error" : ""}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="Enter your name..." />
                </Form.Item>
                {validationErrors.firstName && (
                  <div className="error-text">{validationErrors.firstName}</div>
                )}
              </div>

              <div className="form-col">
                <Form.Item
                  label="Last Name :"
                  name="lastName"
                  validateStatus={validationErrors.lastName ? "error" : ""}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="Enter your name..." />
                </Form.Item>
                {validationErrors.lastName && (
                  <div className="error-text">{validationErrors.lastName}</div>
                )}
              </div>
            </div>

            <Form.Item
              label="Email Id :"
              name="email"
              validateStatus={validationErrors.email ? "error" : ""}
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="info@xyz.com" />
            </Form.Item>
            {validationErrors.email && (
              <div className="error-text">{validationErrors.email}</div>
            )}

            <Form.Item
              label="Mobile No. :"
              name="mobile"
              validateStatus={validationErrors.mobile ? "error" : ""}
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="+977 - 98598 58000" />
            </Form.Item>
            {validationErrors.mobile && (
              <div className="error-text">{validationErrors.mobile}</div>
            )}

            <div className="form-row">
              <div className="form-col">
                <Form.Item
                  label="Password :"
                  name="password"
                  validateStatus={validationErrors.password ? "error" : ""}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input.Password placeholder="xxxxxxxx" />
                </Form.Item>
                {password && <PasswordStrengthMeter password={password} />}
                {validationErrors.password && (
                  <div className="error-text">{validationErrors.password}</div>
                )}
              </div>

              <div className="form-col">
                <Form.Item
                  label="Confirm Password :"
                  name="confirmPassword"
                  dependencies={["password"]}
                  validateStatus={
                    validationErrors.confirmPassword ? "error" : ""
                  }
                  rules={[
                    { required: true, message: "" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(""));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="xxxxxxxx" />
                </Form.Item>
                {validationErrors.confirmPassword && (
                  <div className="error-text">
                    {validationErrors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="signup-button"
            >
              Sign up
            </Button>

            <div className="back-to-login">
              <Link to="/login" className="back-link">
                Back to Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
      <div className="signup-image-section">
        <img
          src={beachImage || "/placeholder.svg"}
          alt="Beach wedding"
          className="signup-image"
        />
      </div>
    </motion.div>
  );
};

export default SignupPage;

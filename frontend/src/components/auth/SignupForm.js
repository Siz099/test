"use client";

import { useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useAuth();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setFormErrors({});
      await register(
        values.firstName + " " + values.lastName,
        values.email,
        values.password
      );
      navigate("/dashboard");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="signup"
      onFinish={onFinish}
      layout="vertical"
      requiredMark={false}
      className="auth-form"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First Name :"
            name="firstName"
            rules={[{ required: true, message: "Enter your first name" }]}
            help={formErrors.firstName}
            validateStatus={formErrors.firstName ? "error" : ""}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name :"
            name="lastName"
            rules={[{ required: true, message: "Enter your last name" }]}
            help={formErrors.lastName}
            validateStatus={formErrors.lastName ? "error" : ""}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email Id :"
        name="email"
        rules={[
          { required: true, message: "Enter your Email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
        help={formErrors.email}
        validateStatus={formErrors.email ? "error" : ""}
      >
        <Input placeholder="info@xyz.com" />
      </Form.Item>

      <Form.Item
        label="Mobile No. :"
        name="mobile"
        rules={[{ required: true, message: "Enter your Contact Number" }]}
        help={formErrors.mobile}
        validateStatus={formErrors.mobile ? "error" : ""}
      >
        <Input placeholder="+977 - 98598 58000" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Password :"
            name="password"
            rules={[
              { required: true, message: "Enter your Password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            help={formErrors.password}
            validateStatus={formErrors.password ? "error" : ""}
          >
            <Input.Password
              placeholder="xxxxxxxx"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Confirm Password :"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm Password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Confirm Password"));
                },
              }),
            ]}
            help={formErrors.confirmPassword}
            validateStatus={formErrors.confirmPassword ? "error" : ""}
          >
            <Input.Password
              placeholder="xxxxxxxx"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="signup-button"
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;

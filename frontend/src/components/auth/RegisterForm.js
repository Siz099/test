"use client"

import { useState } from "react"
import { Form, Input, Button, message } from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { authApi } from "../../api/authApi"
import { setToken } from "../../utils/auth"
import "../../styles/RegisterForm.css"

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await authApi.register(values)
      setToken(response.token)
      message.success("Registration successful!")
      navigate("/login")
    } catch (error) {
      console.error("Registration error:", error)
      message.error(error.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-form-container">
      <h2 className="register-title">Create an account</h2>

      <Form name="register" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical" size="large">
        <Form.Item name="name" rules={[{ required: true, message: "Please input your name!" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("The two passwords do not match!"))
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button" loading={loading}>
            Register now
          </Button>
        </Form.Item>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Form>
    </div>
  )
}

export default RegisterForm;

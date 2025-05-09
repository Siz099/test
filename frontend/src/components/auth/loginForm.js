"use client"

import { useState } from "react"
import { Form, Input, Button, Divider, message } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"
import { authApi } from "../../api/authApi"
import { setToken } from "../../utils/auth"
import "../../styles/LoginForm.css"

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await authApi.login(values)
      setToken(response.token)
      message.success("Login successful!")

      // Redirect based on user role or to a default page
      // For now, we'll just log the success
      console.log("Login successful:", response)

      // You would typically redirect here
      // navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      message.error(error.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-form-container">
      <h2 className="login-title">Login into your account</h2>

      <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical" size="large">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-button" loading={loading}>
            Login now
          </Button>
        </Form.Item>

        <Divider plain>OR</Divider>

        <Button className="register-button" onClick={() => navigate("/register")}>
          Sign up now
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm;

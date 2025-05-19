"use client";

import { Button, Typography, Layout, Space } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const { Title, Text } = Typography;
const { Content } = Layout;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout className="dashboard-layout">
      <Content className="dashboard-content">
        <div className="dashboard-container">
          <Title level={2}>Dashboard</Title>
          <Text>Welcome back, {user?.name || "User"}!</Text>

          <div className="dashboard-actions">
            <Space>
              <Button
                type="primary"
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </Button>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;

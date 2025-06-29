import React, { useState } from "react";
import PartnerRequests from "./PartnerRequests";
import RecentBookings from "./RecentBookings";

const stats = [
  { label: "Users", value: 245 },
  { label: "Partners", value: 32 },
  { label: "Venues", value: 58 },
  { label: "Bookings", value: 387 },
  { label: "Revenue", value: "NPR 4,850,000" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <main className="dashboard" style={{ flex: 1 }}>
      <div className="breadcrumb">Admin > Dashboard</div>
      <h1>Admin Dashboard</h1>
      <p>Manage the entire platform</p>
      <div className="stats-row">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="tabs">
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          Pending Partners
        </button>
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Recent Bookings
        </button>
      </div>
      {activeTab === "pending" ? <PartnerRequests /> : <RecentBookings />}
    </main>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import RecentBookings from "../admin/RecentBookings";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

 useEffect(() => {
  const token = localStorage.getItem("jwtToken");  // make sure this matches your login save key
  if (!token) {
    console.error("No JWT token found, user might not be logged in");
    return;
  }

  fetch("http://localhost:8080/api/stats", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    setStats([
      { label: "Venues", value: data.venues },
      { label: "Bookings", value: data.bookings },
    ]);
  })
  .catch(console.error);
}, []);
  return (
    <main className="dashboard" style={{ flex: 1 }}>
      <div className="breadcrumb">Partner &gt; Dashboard</div>
      <h1>Partner Dashboard</h1>
      <p>Manage your venues and bookings</p>
      <div className="stats-row">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <RecentBookings />
      </div>
    </main>
  );
};

export default Dashboard; 
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Users", path: "/admin/users" },
  { label: "Partners", path: "/admin/partners" },
  { label: "Venues", path: "/admin/venues" },
  { label: "Bookings", path: "/admin/bookings" },
  { label: "Notifications", path: "/admin/notifications" },
  { label: "Settings", path: "/admin/settings" },
];

const Sidebar = () => (
  <aside className="sidebar">
    <h2>VenueHub</h2>
    <div className="sidebar-section">Admin Panel</div>
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
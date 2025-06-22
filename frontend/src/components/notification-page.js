"use client"

import { useState } from "react"
import "../styles/notification-page.css"

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Your booking for grand ballroom has been confirmed",
      time: "Just now",
      type: "success",
      read: false,
    },
    {
      id: 2,
      text: "Payment of NPR 30,000 has been processed successfully",
      time: "1 min ago",
      type: "success",
      read: false,
    },
    {
      id: 3,
      text: "Reminder: your event at Grand Ballroom is scheduled for May 25, 2025.",
      time: "2 min ago",
      type: "warning",
      read: false,
    },
    {
      id: 4,
      text: "Please complete your profile information to improve your recommendations.",
      time: "3 days ago",
      type: "warning",
      read: true,
    },
    {
      id: 5,
      text: "New venue added in kathmandu. Check them out!",
      time: "1 week ago",
      type: "warning",
      read: true,
    },
  ])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    return true // 'all' tab
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="header">
        <h1 className="title">Notifications</h1>
        <div className="header-buttons">
          <button onClick={markAllAsRead} disabled={unreadCount === 0} className="mark-all-btn">
            Mark all as read
          </button>
          <button onClick={clearAll} disabled={notifications.length === 0} className="clear-all-btn">
            Clear all
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button onClick={() => setActiveTab("all")} className={`tab-button ${activeTab === "all" ? "active" : ""}`}>
          All notifications
          {notifications.length > 0 && <span className="tab-count gray">{notifications.length}</span>}
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={`tab-button ${activeTab === "unread" ? "active" : ""}`}
        >
          Unread
          {unreadCount > 0 && <span className="tab-count red">{unreadCount}</span>}
        </button>
        <button onClick={() => setActiveTab("read")} className={`tab-button ${activeTab === "read" ? "active" : ""}`}>
          Read
          {notifications.filter((n) => n.read).length > 0 && (
            <span className="tab-count gray">{notifications.filter((n) => n.read).length}</span>
          )}
        </button>
      </div>

      {/* Notifications Card */}
      <div className="notifications-card">
        <div className="card-header">
          <h2 className="card-title">Your Notification</h2>
          <p className="card-subtitle">Stay updated with important notice</p>
        </div>
        <div className="card-content">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <p>No notifications to show</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.read && markAsRead(notification.id)}
                className={`notification-item ${!notification.read ? "unread" : "read"}`}
              >
                <div className={`notification-dot ${notification.type}`} />
                <div className="notification-content">
                  <div className="notification-text-container">
                    <p className="notification-text">{notification.text}</p>
                    {!notification.read && <div className="unread-indicator" />}
                  </div>
                  <p className="notification-time">{notification.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage

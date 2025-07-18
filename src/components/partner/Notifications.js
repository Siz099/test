import React, { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../../services/api';
import '../../styles/admin/Notification.css';

const tabList = [
  { key: 'all', label: 'All notifications' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
];

const Notifications = () => {
  const [tab, setTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await notificationService.getUserNotifications();
      setNotifications(data);
      setError(null);
    } catch (e) {
      console.error('Error fetching notifications:', e);
      setError('Failed to load notifications');
      // Fallback mock data for partners
      setNotifications([
        { 
          id: 1, 
          type: 'booking', 
          message: 'New booking request for Grand Ballroom on March 15, 2024', 
          time: 'Just now', 
          read: false 
        },
        { 
          id: 2, 
          type: 'payment', 
          message: 'Payment of NPR 45,000 received for Garden Hall booking', 
          time: '2 hours ago', 
          read: false 
        },
        { 
          id: 3, 
          type: 'venue', 
          message: 'Your venue "Conference Room A" has been approved and is now live', 
          time: '1 day ago', 
          read: false 
        },
        { 
          id: 4, 
          type: 'system', 
          message: 'Please update your business documents for compliance', 
          time: '3 days ago', 
          read: true 
        },
        { 
          id: 5, 
          type: 'booking', 
          message: 'Booking cancelled for Grand Ballroom on February 28, 2024', 
          time: '1 week ago', 
          read: true 
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const filtered = notifications.filter(n => {
    if (tab === 'all') return true;
    if (tab === 'unread') return !n.read;
    if (tab === 'read') return n.read;
    return true;
  });

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev =>
        prev.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setNotifications(prev =>
        prev.map(notification => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    }
  };

  const clearAll = async () => {
    try {
      // await notificationService.clearAll();
      setNotifications([]);
    } catch (err) {
      console.error('Error clearing notifications:', err);
      setNotifications([]);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h2 className="notification-title">Notifications</h2>
        <div className="notification-tabs">
          {tabList.map(t => (
            <button
              key={t.key}
              className={`notification-tab${tab === t.key ? ' active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div className="notification-actions">
            <button className="notification-action mark-read" onClick={markAllAsRead}>
              Mark all as read
            </button>
            <button className="notification-action" onClick={clearAll}>
              Clear all
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          background: '#fff3cd',
          color: '#856404',
          padding: '12px',
          margin: '20px 36px',
          borderRadius: '4px',
          border: '1px solid #ffeaa7'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ padding: '0 36px 36px 36px' }}>
        <div className="notification-card">
          <div className="notification-card-header">
            <div className="notification-card-title">Your Notifications</div>
            <div className="notification-card-desc">Stay updated with booking requests and venue updates</div>
          </div>
          <div className="notification-list">
            {filtered.length === 0 && (
              <div className="notification-empty">No notifications</div>
            )}
            {filtered.map(n => (
              <div 
                key={n.id} 
                className="notification-item"
                onClick={() => !n.read && markAsRead(n.id)}
                style={{ cursor: !n.read ? 'pointer' : 'default' }}
              >
                <span className={`notification-dot${n.read ? ' read' : ' unread'}`}></span>
                <div>
                  <div className="notification-message">{n.message}</div>
                  <div className="notification-time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
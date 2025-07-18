import React, { useState, useEffect } from 'react';
import { partnerStatsService } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    venues: 0,
    bookings: 0,
    revenue: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await partnerStatsService.getPartnerStats();
        setStats(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching partner stats:', err);
        setError('Failed to load dashboard statistics');
        // Fallback data
        setStats({
          venues: 3,
          bookings: 12,
          revenue: 150000,
          pendingBookings: 2
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="dashboard" style={{ flex: 1 }}>
      <div className="breadcrumb">Partner > Dashboard</div>
      <h1>Partner Dashboard</h1>
      <p>Manage your venues and bookings</p>
      
      {error && (
        <div style={{
          background: '#fff3cd',
          color: '#856404',
          padding: '12px',
          margin: '20px 0',
          borderRadius: '4px',
          border: '1px solid #ffeaa7'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">My Venues</div>
          <div className="stat-value">{stats.venues}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value">{stats.bookings}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Revenue (NPR)</div>
          <div className="stat-value">{stats.revenue?.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Bookings</div>
          <div className="stat-value">{stats.pendingBookings}</div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={() => window.location.href = '/partner/venues/new'}
            style={{ 
              background: '#111', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '10px 22px', 
              fontWeight: '600', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }}
          >
            + Add New Venue
          </button>
          <button 
            onClick={() => window.location.href = '/partner/bookings'}
            style={{ 
              background: '#fff', 
              color: '#111', 
              border: '1px solid #ddd', 
              borderRadius: '6px', 
              padding: '10px 22px', 
              fontWeight: '600', 
              fontSize: '16px', 
              cursor: 'pointer' 
            }}
          >
            View Bookings
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
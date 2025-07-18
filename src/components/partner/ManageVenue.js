import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { partnerVenueService } from '../../services/api';

const ManageVenue = () => {
  const [venues, setVenues] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    }
    if (menuOpenId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpenId]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const data = await partnerVenueService.listMyVenues();
        setVenues(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch venues', error);
        setError('Failed to load venues. Please try again.');
        // Fallback data
        setVenues([
          {
            venue_id: 1,
            venueName: 'Grand Ballroom',
            location: 'Kathmandu',
            capacity: 500,
            price: 15000,
            status: 'Active',
            bookings: 8
          },
          {
            venue_id: 2,
            venueName: 'Garden Hall',
            location: 'Pokhara',
            capacity: 200,
            price: 8000,
            status: 'Active',
            bookings: 3
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;
    
    try {
      await partnerVenueService.deleteVenue(id);
      setVenues(prev => prev.filter(v => v.venue_id !== id));
      alert('Venue deleted successfully!');
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete venue. Please try again.');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await partnerVenueService.updateVenueStatus(id, 'Inactive');
      setVenues(prev => prev.map(venue =>
        venue.venue_id === id ? { ...venue, status: 'Inactive' } : venue
      ));
      setMenuOpenId(null);
    } catch (err) {
      console.error('Failed to deactivate venue:', err);
      alert('Failed to deactivate venue. Please try again.');
    }
  };

  const handleAdd = () => {
    navigate('/partner/venues/new');
    setMenuOpenId(null);
  };

  const handleEditVenue = (venue) => {
    if (!venue?.venue_id) {
      console.error('Invalid venue ID:', venue?.venue_id);
      return;
    }
    navigate(`/partner/venues/edit/${venue.venue_id}`);
  };

  const handleViewVenue = (venue) => {
    if (!venue?.venue_id) {
      console.error('Invalid venue ID:', venue?.venue_id);
      return;
    }
    navigate(`/partner/venues/${venue.venue_id}`);
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
        Loading your venues...
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #eee' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>My Venues</h1>
      <p style={{ color: '#888', marginBottom: 24 }}>Manage your venue listings</p>
      
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>All Venues ({venues.length})</h2>
        <button onClick={handleAdd} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
          + Add New Venue
        </button>
      </div>

      <input 
        type="text" 
        placeholder="Search venues by name or location..." 
        style={{ width: 320, padding: 8, borderRadius: 6, border: '1px solid #ddd', marginBottom: 16 }} 
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
        <thead>
          <tr style={{ background: '#f7f7f7', textAlign: 'left' }}>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Venue Name</th>
            <th style={{ padding: 10 }}>Location</th>
            <th style={{ padding: 10 }}>Capacity</th>
            <th style={{ padding: 10 }}>Price/Hour</th>
            <th style={{ padding: 10 }}>Bookings</th>
            <th style={{ padding: 10 }}>Status</th>
            <th style={{ padding: 10 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.venue_id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 10 }}>{venue.venue_id}</td>
              <td style={{ padding: 10 }}>{venue.venueName}</td>
              <td style={{ padding: 10 }}>{venue.location}</td>
              <td style={{ padding: 10 }}>{venue.capacity}</td>
              <td style={{ padding: 10 }}>NPR {venue.price}</td>
              <td style={{ padding: 10 }}>{venue.bookings || 0}</td>
              <td style={{ padding: 10 }}>
                <span style={{
                  background: venue.status === 'Active' ? '#e6ffe6' : '#ffe6e6',
                  color: venue.status === 'Active' ? '#22bb33' : '#d9534f',
                  borderRadius: 12,
                  padding: '4px 14px',
                  fontWeight: 500,
                  fontSize: 14
                }}>
                  {venue.status}
                </span>
              </td>
              <td style={{ padding: 10, position: 'relative' }}>
                <button
                  style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
                  onClick={() => setMenuOpenId(menuOpenId === venue.venue_id ? null : venue.venue_id)}
                  aria-label="Actions"
                >
                  ⋮
                </button>

                {menuOpenId === venue.venue_id && (
                  <div
                    ref={menuRef}
                    style={{
                      position: 'absolute',
                      top: 30,
                      right: 0,
                      background: '#fff',
                      border: '1px solid #eee',
                      borderRadius: 8,
                      boxShadow: '0 2px 8px #eee',
                      zIndex: 10,
                      minWidth: 180
                    }}
                  >
                    <div style={{ padding: '10px 16px', fontWeight: 600, color: '#888', borderBottom: '1px solid #f0f0f0' }}>
                      Actions
                    </div>
                    <button
                      style={menuBtnStyle}
                      onClick={() => {
                        setMenuOpenId(null);
                        handleViewVenue(venue);
                      }}
                    >
                      View venue
                    </button>
                    <button
                      style={menuBtnStyle}
                      onClick={() => {
                        setMenuOpenId(null);
                        handleEditVenue(venue);
                      }}
                    >
                      Edit venue
                    </button>
                    <button 
                      style={menuBtnStyle} 
                      onClick={() => { 
                        setMenuOpenId(null); 
                        navigate(`/partner/venues/${venue.venue_id}/bookings`);
                      }}
                    >
                      View bookings
                    </button>
                    <button 
                      style={menuBtnStyle} 
                      onClick={() => { 
                        setMenuOpenId(null); 
                        handleDeactivate(venue.venue_id); 
                      }}
                    >
                      Deactivate venue
                    </button>
                    <button
                      style={{ ...menuBtnStyle, color: '#d9534f' }}
                      onClick={() => {
                        setMenuOpenId(null);
                        handleDelete(venue.venue_id);
                      }}
                    >
                      Delete venue
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {venues.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px', 
          color: '#666',
          fontSize: '18px'
        }}>
          No venues found. <button onClick={handleAdd} style={{ color: '#111', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Add your first venue!</button>
        </div>
      )}
    </div>
  );
};

const menuBtnStyle = {
  display: 'block',
  width: '100%',
  padding: '10px 16px',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  fontSize: 15,
  cursor: 'pointer',
  color: '#222',
  borderBottom: '1px solid #f0f0f0',
};

export default ManageVenue;
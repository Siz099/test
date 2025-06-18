import React, { useState, useRef } from 'react';

const initialVenues = [
  { id: 1, name: 'Grand Ballroom', partner: 'Royal Events', location: 'Kathmandu, Nepal', capacity: 500, price: 'NPR 15,000', bookings: 25, status: 'Active' },
  { id: 2, name: 'Mountain View Resort', partner: 'Mountain View Resorts', location: 'Nagarkot, Nepal', capacity: 350, price: 'NPR 18,000', bookings: 18, status: 'Active' },
  { id: 3, name: 'Conference Center', partner: 'City Conference Center', location: 'Lalitpur, Nepal', capacity: 200, price: 'NPR 10,000', bookings: 42, status: 'Active' },
  { id: 4, name: 'Riverside Garden', partner: 'Garden Paradise', location: 'Pokhara, Nepal', capacity: 300, price: 'NPR 12,000', bookings: 15, status: 'Active' },
  { id: 5, name: 'Heritage Hall', partner: 'Royal Events', location: 'Bhaktapur, Nepal', capacity: 250, price: 'NPR 13,000', bookings: 10, status: 'Inactive' },
    { id: 5, name: 'Heritage Hall', partner: 'Royal Evenadadad', location: 'Bhaktapur, Nepal', capacity: 250, price: 'NPR 13,000', bookings: 10, status: 'Inactive' },
];

const VenueManagement = () => {
  const [venues, setVenues] = useState(initialVenues);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const menuRef = useRef();

  // Close menu on click outside
  React.useEffect(() => {
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

  const handleDelete = (id) => {
    setVenues((prev) => prev.filter((venue) => venue.id !== id));
    setMenuOpenId(null);
  };

  const handleDeactivate = (id) => {
    setVenues((prev) => prev.map((venue) =>
      venue.id === id ? { ...venue, status: 'Inactive' } : venue
    ));
    setMenuOpenId(null);
  };

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #eee' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Venue Management</h1>
      <p style={{ color: '#888', marginBottom: 24 }}>Manage all venues on the platform</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>All Venues</h2>
        <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Add New Venue</button>
      </div>
      <input type="text" placeholder="Search venues by name, partner, or location..." style={{ width: 320, padding: 8, borderRadius: 6, border: '1px solid #ddd', marginBottom: 16 }} />
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
        <thead>
          <tr style={{ background: '#f7f7f7', textAlign: 'left' }}>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Venue Name</th>
            <th style={{ padding: 10 }}>Partner</th>
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
            <tr key={venue.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 10 }}>{venue.id}</td>
              <td style={{ padding: 10 }}>{venue.name}</td>
              <td style={{ padding: 10 }}>{venue.partner}</td>
              <td style={{ padding: 10 }}>{venue.location}</td>
              <td style={{ padding: 10 }}>{venue.capacity}</td>
              <td style={{ padding: 10 }}>{venue.price}</td>
              <td style={{ padding: 10 }}>{venue.bookings}</td>
              <td style={{ padding: 10 }}>
                <span style={{ background: venue.status === 'Active' ? '#e6ffe6' : '#ffe6e6', color: venue.status === 'Active' ? '#22bb33' : '#d9534f', borderRadius: 12, padding: '4px 14px', fontWeight: 500, fontSize: 14 }}>{venue.status}</span>
              </td>
              <td style={{ padding: 10, position: 'relative' }}>
                <button
                  style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
                  onClick={() => setMenuOpenId(menuOpenId === venue.id ? null : venue.id)}
                  aria-label="Actions"
                >
                  ⋮
                </button>
                {menuOpenId === venue.id && (
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
                      minWidth: 180,
                      padding: 0,
                    }}
                  >
                    <div style={{ padding: '10px 16px', fontWeight: 600, color: '#888', borderBottom: '1px solid #f0f0f0' }}>Actions</div>
                    <button style={menuBtnStyle} onClick={() => { setMenuOpenId(null); alert('View details'); }}>View details</button>
                    <button style={menuBtnStyle} onClick={() => { setMenuOpenId(null); alert('Edit venue'); }}>Edit venue</button>
                    <button style={menuBtnStyle} onClick={() => { setMenuOpenId(null); alert('View bookings'); }}>View bookings</button>
                    <button style={menuBtnStyle} onClick={() => handleDeactivate(venue.id)}>Deactivate venue</button>
                    <button style={{ ...menuBtnStyle, color: '#d9534f' }} onClick={() => handleDelete(venue.id)}>Delete venue</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default VenueManagement;

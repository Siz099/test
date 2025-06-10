import React from 'react';

const venues = [
  { id: 1, name: 'Grand Ballroom', partner: 'Royal Events', location: 'Kathmandu, Nepal', capacity: 500, price: 'NPR 15,000', bookings: 25, status: 'Active' },
  { id: 2, name: 'Mountain View Resort', partner: 'Mountain View Resorts', location: 'Nagarkot, Nepal', capacity: 350, price: 'NPR 18,000', bookings: 18, status: 'Active' },
  { id: 3, name: 'Conference Center', partner: 'City Conference Center', location: 'Lalitpur, Nepal', capacity: 200, price: 'NPR 10,000', bookings: 42, status: 'Active' },
];

const VenueManagement = () => (
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
              <span style={{ background: '#e6ffe6', color: '#22bb33', borderRadius: 12, padding: '4px 14px', fontWeight: 500, fontSize: 14 }}>{venue.status}</span>
            </td>
            <td style={{ padding: 10 }}>
              <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>⋮</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default VenueManagement;

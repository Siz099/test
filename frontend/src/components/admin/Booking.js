import React, { useEffect, useState,useRef } from 'react';
import '../../styles/admin/Booking.css'; // Create this CSS file for custom styles
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../../services/api';

const statusColors = {
  Confirmed: '#b2ffb2',
  Active: '#b2ffb2',
  Cancelled: '#ffb2b2',
  Pending: '#fff7b2',
};

const statusTextColors = {
  Confirmed: '#1a7f1a',
  Active: '#1a7f1a',
  Cancelled: '#b21a1a',
  Pending: '#b29a1a',
};

const Booking = () => {
const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [actionMenu, setActionMenu] = useState({ open: false, index: null });
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

  useEffect(() => {
  
     const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingService.listBooking();
      setBookings(response);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };
  fetchBookings();
}, []);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setActionMenu({ open: false, index: null });
      }
    };

    if (actionMenu.open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionMenu]);

  const handleAction = (action, booking) => {
    setActionMenu({ open: false, index: null });
    console.log(`${action} clicked for booking ID ${booking.id}`);
    // Implement your API call here if needed
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.venue.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/admin/bookings/new");
    setActionMenu({ open: false, index: null });
  };

  
  return (
    <div className="booking-management-container">
      <div className="booking-header">
        <h2>Booking Management</h2>
          <button onClick={handleAdd} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Add New Booking</button>
      </div>
      <a href="#" className="manage-link">Manage all booking</a>
      <div className="booking-table-container">
        <div className="booking-table-header">
          <div>All Bookings</div>
          <div className="booking-table-desc">A list of all booking made on the platform</div>
        </div>
        <input
          type="text"
          className="booking-search"
          placeholder="Search user by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Venue Name</th>
              <th>Partner</th>
              <th>Customer</th>
              <th>Date/Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b, idx) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.venue}</td>
                <td>{b.partner}</td>
                <td>{b.customer}</td>
                <td>{b.datetime}</td>
                <td>{b.amount}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ background: statusColors[b.status] || '#eee', color: statusTextColors[b.status] || '#333' }}
                  >
                    {b.status}
                  </span>
                </td>
                <td style={{ position: 'relative' }}>
                  <button
                    className="action-btn"
                    onClick={() => setActionMenu({ open: !actionMenu.open || actionMenu.index !== idx, index: idx })}
                  >
                    &#8942;
                  </button>
                  {actionMenu.open && actionMenu.index === idx && (
                    <div className="action-menu">
                      <div className="action-menu-title">Actions</div>
                      <div onClick={() => handleAction('View Details', b)}>View Details</div>
                      <div onClick={() => handleAction('Edit Venue', b)}>Edit Venue</div>
                      <div onClick={() => handleAction('View Bookings', b)}>View Bookings</div>
                      <div onClick={() => handleAction('Approve Venue', b)}>Approve Venue</div>
                      <div onClick={() => handleAction('Reject Venue', b)}>Reject Venue</div>
                      <div className="delete-action" onClick={() => handleAction('Delete Venue', b)}>Delete Venue</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;

import React, { useEffect, useState, useRef } from 'react';
import '../../styles/admin/Booking.css';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Optionally filter bookings for the current partner if API supports it
        const response = await bookingService.listBooking();
        setBookings(response);
      } catch (err) {
        setError("Failed to fetch bookings.");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.venue.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/partner/bookings/new");
  };

  return (
    <div className="booking-management-container">
      <div className="booking-header">
        <h2>Booking Management</h2>
        <button onClick={handleAdd} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Add New Booking</button>
      </div>
      <div className="booking-table-container">
        <div className="booking-table-header">
          <div>All Bookings</div>
          <div className="booking-table-desc">A list of all bookings for your venues</div>
        </div>
        <input
          type="text"
          className="booking-search"
          placeholder="Search by venue or customer..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Venue Name</th>
              <th>Customer</th>
              <th>Date/Time</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.venue}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking; 
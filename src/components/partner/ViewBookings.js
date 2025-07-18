import React, { useEffect, useState } from 'react';
import { partnerBookingService } from '../../services/api';

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

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await partnerBookingService.listMyBookings();
        setBookings(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings.');
        // Fallback data
        setBookings([
          {
            id: 1,
            venue: 'Grand Ballroom',
            customer: 'John Doe',
            datetime: '2024-02-15 18:00',
            amount: 'NPR 75,000',
            status: 'Confirmed',
            guests: 150,
            duration: 6
          },
          {
            id: 2,
            venue: 'Garden Hall',
            customer: 'Jane Smith',
            datetime: '2024-02-20 14:00',
            amount: 'NPR 32,000',
            status: 'Pending',
            guests: 80,
            duration: 4
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.venue.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await partnerBookingService.updateBookingStatus(bookingId, newStatus);
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      alert(`Booking ${newStatus.toLowerCase()} successfully!`);
    } catch (err) {
      console.error('Failed to update booking status:', err);
      alert('Failed to update booking status. Please try again.');
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
        Loading bookings...
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #eee' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>My Bookings</h2>
        <p style={{ color: '#888' }}>Manage bookings for your venues</p>
      </div>

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

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>All Bookings</h3>
        <p style={{ color: '#888', marginBottom: 16 }}>Bookings for all your venues</p>
        
        <input
          type="text"
          placeholder="Search by customer name or venue..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ 
            width: 320, 
            padding: 8, 
            borderRadius: 6, 
            border: '1px solid #ddd', 
            marginBottom: 16,
            fontSize: 16
          }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
        <thead>
          <tr style={{ background: '#f7f7f7', textAlign: 'left' }}>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>ID</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Venue</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Customer</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Date/Time</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Guests</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Amount</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Status</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 12 }}>{booking.id}</td>
              <td style={{ padding: 12, fontWeight: 600 }}>{booking.venue}</td>
              <td style={{ padding: 12 }}>{booking.customer}</td>
              <td style={{ padding: 12 }}>{booking.datetime}</td>
              <td style={{ padding: 12 }}>{booking.guests}</td>
              <td style={{ padding: 12, fontWeight: 600 }}>{booking.amount}</td>
              <td style={{ padding: 12 }}>
                <span
                  style={{ 
                    background: statusColors[booking.status] || '#eee', 
                    color: statusTextColors[booking.status] || '#333',
                    padding: '4px 12px',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 500
                  }}
                >
                  {booking.status}
                </span>
              </td>
              <td style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {booking.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'Confirmed')}
                        style={{
                          background: '#22bb33',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: 12,
                          fontWeight: 600
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'Cancelled')}
                        style={{
                          background: '#d9534f',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: 12,
                          fontWeight: 600
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => alert(`View details for booking ${booking.id}`)}
                    style={{
                      background: '#fff',
                      color: '#111',
                      border: '1px solid #ddd',
                      padding: '6px 12px',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBookings.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px', 
          color: '#666',
          fontSize: '18px'
        }}>
          {search ? 'No bookings found matching your search.' : 'No bookings yet.'}
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
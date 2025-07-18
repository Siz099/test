import React from 'react';

const BookingTable = ({ 
  bookings = [], 
  onStatusUpdate, 
  showCustomerInfo = true, 
  showPartnerInfo = false,
  isPartner = false 
}) => {
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

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    try {
      const date = new Date(dateTime);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateTime;
    }
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        background: '#fff', 
        borderRadius: 12, 
        overflow: 'hidden', 
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)' 
      }}>
        <thead>
          <tr style={{ background: '#f7f7f7', textAlign: 'left' }}>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>ID</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Venue</th>
            {showPartnerInfo && (
              <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Partner</th>
            )}
            {showCustomerInfo && (
              <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Customer</th>
            )}
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Date/Time</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Amount</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Status</th>
            <th style={{ padding: 12, fontWeight: 700, color: '#222', fontSize: 16 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 12 }}>{booking.id}</td>
              <td style={{ padding: 12, fontWeight: 600 }}>{booking.venue}</td>
              {showPartnerInfo && (
                <td style={{ padding: 12 }}>{booking.partner}</td>
              )}
              {showCustomerInfo && (
                <td style={{ padding: 12 }}>{booking.customer}</td>
              )}
              <td style={{ padding: 12 }}>{formatDateTime(booking.datetime)}</td>
              <td style={{ padding: 12, fontWeight: 600 }}>{booking.amount}</td>
              <td style={{ padding: 12 }}>
                <span style={{
                  background: statusColors[booking.status] || '#eee',
                  color: statusTextColors[booking.status] || '#333',
                  padding: '4px 12px',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 500
                }}>
                  {booking.status}
                </span>
              </td>
              <td style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {isPartner && booking.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => onStatusUpdate && onStatusUpdate(booking.id, 'Confirmed')}
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
                        onClick={() => onStatusUpdate && onStatusUpdate(booking.id, 'Cancelled')}
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

      {bookings.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '50px',
          color: '#666',
          fontSize: '18px'
        }}>
          No bookings found.
        </div>
      )}
    </div>
  );
};

export default BookingTable;
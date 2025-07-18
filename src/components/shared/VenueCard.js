import React from 'react';

const VenueCard = ({ venue, onEdit, onDelete, onView, showActions = true, isPartner = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return { background: '#e6ffe6', color: '#22bb33' };
      case 'Pending':
        return { background: '#fff7b2', color: '#b29a1a' };
      case 'Inactive':
        return { background: '#ffe6e6', color: '#d9534f' };
      default:
        return { background: '#f0f0f0', color: '#666' };
    }
  };

  const statusStyle = getStatusColor(venue.status);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      padding: 20,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #eee',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      {/* Venue Image */}
      <div style={{
        width: '100%',
        height: 200,
        background: `linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)`,
        borderRadius: 8,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
        fontSize: 14
      }}>
        {venue.image ? (
          <img 
            src={venue.image} 
            alt={venue.venueName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
          />
        ) : (
          'No Image Available'
        )}
      </div>

      {/* Venue Info */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ 
          fontSize: 18, 
          fontWeight: 600, 
          margin: '0 0 8px 0',
          color: '#222'
        }}>
          {venue.venueName}
        </h3>
        <p style={{ 
          color: '#666', 
          margin: '0 0 8px 0',
          fontSize: 14
        }}>
          📍 {venue.location}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#666', fontSize: 14 }}>
            👥 {venue.capacity} guests
          </span>
          <span style={{ 
            ...statusStyle,
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 500
          }}>
            {venue.status}
          </span>
        </div>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 16 }}>
        <span style={{ 
          fontSize: 20, 
          fontWeight: 600, 
          color: '#222' 
        }}>
          NPR {venue.price?.toLocaleString()}
        </span>
        <span style={{ color: '#666', fontSize: 14 }}>/hour</span>
      </div>

      {/* Actions */}
      {showActions && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onView && onView(venue)}
            style={{
              flex: 1,
              background: '#f8f9fa',
              color: '#111',
              border: '1px solid #ddd',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            View
          </button>
          <button
            onClick={() => onEdit && onEdit(venue)}
            style={{
              flex: 1,
              background: '#111',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Edit
          </button>
          {!isPartner && (
            <button
              onClick={() => onDelete && onDelete(venue)}
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VenueCard;
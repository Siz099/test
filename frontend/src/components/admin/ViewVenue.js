import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { venueService } from '../../services/api';

const ViewVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await venueService.getVenue(id);
        setVenue(data);
      } catch {
        setApiError('Failed to load venue details');
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading venue details...</p>;
  if (apiError) return <p style={{ color: 'red' }}>{apiError}</p>;
  if (!venue) return <p>Venue not found.</p>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 8,
        backgroundColor: '#fafafa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2>Venue Details</h2>

      <Detail label="Venue Name" value={venue.venueName} />
      <Detail label="Location" value={venue.location} />
      <Detail label="Capacity" value={venue.capacity} />
      <Detail label="Price per Hour" value={venue.price} />

      <button
        onClick={() => navigate('/admin/venues')}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Back to Venues
      </button>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div style={{ marginBottom: 12, display: 'flex' }}>
    <strong style={{ width: 160 }}>{label}:</strong>
    <span>{value || '-'}</span>
  </div>
);

export default ViewVenue;

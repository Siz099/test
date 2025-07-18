import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { partnerVenueService } from '../../services/api';

const AddVenue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    venueName: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
    amenities: [],
    images: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const amenitiesList = [
    'WiFi', 'Parking', 'Air Conditioning', 'Projector', 
    'Sound System', 'Catering', 'Stage', 'Wheelchair Access'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'amenities') {
      setFormData(prev => {
        const newAmenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter(a => a !== value);
        return { ...prev, amenities: newAmenities };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.venueName.trim()) newErrors.venueName = 'Venue name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.capacity || parseInt(formData.capacity) < 1) {
      newErrors.capacity = 'Valid capacity is required';
    }
    if (!formData.price || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      const venueData = {
        venueName: formData.venueName,
        location: formData.location,
        capacity: parseInt(formData.capacity),
        price: parseFloat(formData.price),
        description: formData.description,
        amenities: formData.amenities,
        status: 'Pending' // New venues need approval
      };

      await partnerVenueService.addVenue(venueData);
      alert('Venue added successfully! It will be reviewed by our team.');
      navigate('/partner/venues');
    } catch (error) {
      console.error('Venue add failed:', error);
      const msg = error.response?.data?.message || 'Error adding venue';
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Add New Venue</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Create a new venue listing</p>

      {apiError && (
        <div style={{ 
          color: 'red', 
          background: '#fff3cd', 
          padding: '12px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #ffeaa7'
        }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            Venue Name *
          </label>
          <input
            type="text"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            placeholder="Enter venue name"
            style={{ 
              width: '100%', 
              padding: 12, 
              border: errors.venueName ? '1px solid red' : '1px solid #ddd', 
              borderRadius: 6,
              fontSize: 16
            }}
          />
          {errors.venueName && <span style={{ color: 'red', fontSize: 14 }}>{errors.venueName}</span>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            style={{ 
              width: '100%', 
              padding: 12, 
              border: errors.location ? '1px solid red' : '1px solid #ddd', 
              borderRadius: 6,
              fontSize: 16
            }}
          />
          {errors.location && <span style={{ color: 'red', fontSize: 14 }}>{errors.location}</span>}
        </div>

        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Capacity *
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Number of guests"
              min="1"
              style={{ 
                width: '100%', 
                padding: 12, 
                border: errors.capacity ? '1px solid red' : '1px solid #ddd', 
                borderRadius: 6,
                fontSize: 16
              }}
            />
            {errors.capacity && <span style={{ color: 'red', fontSize: 14 }}>{errors.capacity}</span>}
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Price per Hour (NPR) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price in NPR"
              min="0"
              step="100"
              style={{ 
                width: '100%', 
                padding: 12, 
                border: errors.price ? '1px solid red' : '1px solid #ddd', 
                borderRadius: 6,
                fontSize: 16
              }}
            />
            {errors.price && <span style={{ color: 'red', fontSize: 14 }}>{errors.price}</span>}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your venue..."
            rows="4"
            style={{ 
              width: '100%', 
              padding: 12, 
              border: errors.description ? '1px solid red' : '1px solid #ddd', 
              borderRadius: 6,
              fontSize: 16,
              resize: 'vertical'
            }}
          />
          {errors.description && <span style={{ color: 'red', fontSize: 14 }}>{errors.description}</span>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            Amenities
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {amenitiesList.map((amenity) => (
              <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleChange}
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
          <button
            type="button"
            onClick={() => navigate('/partner/venues')}
            style={{
              padding: '12px 24px',
              background: '#fff',
              color: '#111',
              border: '1px solid #ddd',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              background: isSubmitting ? '#ccc' : '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            {isSubmitting ? 'Adding...' : 'Add Venue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVenue;
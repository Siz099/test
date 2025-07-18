import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { partnerVenueService } from '../../services/api';

const EditVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    venueName: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
    amenities: []
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const amenitiesList = [
    'WiFi', 'Parking', 'Air Conditioning', 'Projector', 
    'Sound System', 'Catering', 'Stage', 'Wheelchair Access'
  ];

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const dto = await partnerVenueService.getVenue(id);
        setFormData({
          venueName: dto.venueName || '',
          location: dto.location || '',
          capacity: dto.capacity?.toString() || '',
          price: dto.price?.toString() || '',
          description: dto.description || '',
          amenities: dto.amenities || []
        });
        setApiError('');
      } catch (err) {
        console.error('Failed to load venue:', err);
        setApiError('Failed to load venue details.');
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

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
    const errs = {};
    if (!formData.venueName.trim()) errs.venueName = 'Name is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.capacity.trim() || isNaN(Number(formData.capacity)))
      errs.capacity = 'Valid capacity required';
    if (!formData.price.trim() || isNaN(Number(formData.price)))
      errs.price = 'Valid price required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');
    
    try {
      const payload = {
        venueName: formData.venueName,
        location: formData.location,
        capacity: Number(formData.capacity),
        price: Number(formData.price),
        description: formData.description,
        amenities: formData.amenities
      };
      
      await partnerVenueService.updateVenue(id, payload);
      alert('Venue updated successfully!');
      navigate('/partner/venues');
    } catch (err) {
      console.error(err);
      setApiError('Failed to update venue.');
    } finally {
      setIsSubmitting(false);
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
        Loading venue details...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Edit Venue</h2>
      <p style={{ color: '#888', marginBottom: 24 }}>Update your venue information</p>

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
            style={{ 
              width: '100%', 
              padding: 12, 
              border: errors.venueName ? '1px solid red' : '1px solid #ddd', 
              borderRadius: 6,
              fontSize: 16
            }}
          />
          {errors.venueName && <span style={{ color: 'red', fontSize: 14 }}>{errors.venueName}</span>}
          }
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
            style={{ 
              width: '100%', 
              padding: 12, 
              border: errors.location ? '1px solid red' : '1px solid #ddd', 
              borderRadius: 6,
              fontSize: 16
            }}
          />
          {errors.location && <span style={{ color: 'red', fontSize: 14 }}>{errors.location}</span>}
          }
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
            }
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
            }
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
          }
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVenue;
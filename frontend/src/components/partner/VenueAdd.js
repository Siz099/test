
import { useNavigate } from 'react-router-dom';
import { venueService,partnerService } from '../../services/api';
import React, { useState, useEffect } from 'react';


const VenueAdd = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    venueName: '',
    location: '',
    capacity: '',
    price: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnerService.listPartners();
        setPartners(response);
      } catch (err) {
        console.error('Failed to fetch partners:', err);
        setPartners([]);
      }
    };
    fetchPartners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.venueName.trim()) errs.venueName = 'Venue name is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.imageUrl.trim()) errs.imageUrl = 'Image URL is required';

    if (
      !formData.capacity.trim() ||
      isNaN(Number(formData.capacity)) ||
      Number(formData.capacity) <= 0
    )
      errs.capacity = 'Please enter a valid capacity';

    if (
      !formData.price.trim() ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    )
      errs.price = 'Please enter a valid price';

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
        venueName: formData.venueName.trim(),
        location: formData.location.trim(),
        capacity: Number(formData.capacity),
        price: Number(formData.price),
        imageUrl: formData.imageUrl.trim(),
      };

      await venueService.addVenue(payload);

      alert('Venue added successfully!');
      navigate('/partner/venues');

      // Reset form
      setFormData({
        venueName: '',
        location: '',
        capacity: '',
        price: '',
        imageUrl: '',
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setApiError('Venue with this name already exists.');
      } else {
        setApiError('Failed to add venue. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 12px',
    fontSize: 15,
    borderRadius: 4,
    border: errors[field] ? '1.5px solid #e74c3c' : '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
      noValidate
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
        Add New Venue
      </h2>

      {/* Venue Name */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="venueName"
          style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: '#444' }}
        >
          Venue Name:
        </label>
        <input
          id="venueName"
          name="venueName"
          type="text"
          placeholder="Enter venue name"
          value={formData.venueName}
          onChange={handleChange}
          style={inputStyle('venueName')}
          aria-invalid={!!errors.venueName}
          aria-describedby="venueName-error"
        />
        {errors.venueName && (
          <div id="venueName-error" style={{ color: '#e74c3c', marginTop: 4 }}>
            {errors.venueName}
          </div>
        )}
      </div>

     
      {/* Location */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="location"
          style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: '#444' }}
        >
          Location:
        </label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Enter location"
          value={formData.location}
          onChange={handleChange}
          style={inputStyle('location')}
          aria-invalid={!!errors.location}
          aria-describedby="location-error"
        />
        {errors.location && (
          <div id="location-error" style={{ color: '#e74c3c', marginTop: 4 }}>
            {errors.location}
          </div>
        )}
      </div>

      {/* Capacity */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="capacity"
          style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: '#444' }}
        >
          Capacity:
        </label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          min="1"
          placeholder="Enter capacity"
          value={formData.capacity}
          onChange={handleChange}
          style={inputStyle('capacity')}
          aria-invalid={!!errors.capacity}
          aria-describedby="capacity-error"
        />
        {errors.capacity && (
          <div id="capacity-error" style={{ color: '#e74c3c', marginTop: 4 }}>
            {errors.capacity}
          </div>
        )}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="price"
          style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: '#444' }}
        >
          Price per Hour ($):
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter price per hour"
          value={formData.price}
          onChange={handleChange}
          style={inputStyle('price')}
          aria-invalid={!!errors.price}
          aria-describedby="price-error"
        />
        {errors.price && (
          <div id="price-error" style={{ color: '#e74c3c', marginTop: 4 }}>
            {errors.price}
          </div>
        )}
      </div>

      {/* Image URL */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="imageUrl"
          style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: '#444' }}
        >
          Image URL:
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="Enter image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          style={inputStyle('imageUrl')}
          aria-invalid={!!errors.imageUrl}
          aria-describedby="imageUrl-error"
        />
        {errors.imageUrl && (
          <div id="imageUrl-error" style={{ color: '#e74c3c', marginTop: 4 }}>
            {errors.imageUrl}
          </div>
        )}
      </div>

      {apiError && (
        <div
          role="alert"
          style={{
            color: '#e74c3c',
            marginBottom: 16,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {apiError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: isSubmitting ? '#95c79f' : '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          fontSize: 16,
          fontWeight: 'bold',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Add Venue'}
      </button>
    </form>
  );
};

export default VenueAdd;

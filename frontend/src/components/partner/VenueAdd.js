import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { venueService } from '../../services/api';

const VenueAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    venueName: '',
    location: '',
    capacity: '',
    price: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.venueName.trim()) errs.venueName = 'Venue name is required';
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.capacity.trim() || isNaN(Number(formData.capacity))) errs.capacity = 'Valid capacity required';
    if (!formData.price.trim() || isNaN(Number(formData.price))) errs.price = 'Valid price required';
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
      };
      await venueService.addVenue(payload);
      alert('Venue added successfully!');
      navigate('/partner/venues');
    } catch (err) {
      setApiError('Failed to add venue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Add New Venue</h2>
      {apiError && <div style={{ color: 'red' }}>{apiError}</div>}
      <div>
        <label>Venue Name</label>
        <input name="venueName" value={formData.venueName} onChange={handleChange} />
        {errors.venueName && <span style={{ color: 'red' }}>{errors.venueName}</span>}
      </div>
      <div>
        <label>Location</label>
        <input name="location" value={formData.location} onChange={handleChange} />
        {errors.location && <span style={{ color: 'red' }}>{errors.location}</span>}
      </div>
      <div>
        <label>Capacity</label>
        <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} />
        {errors.capacity && <span style={{ color: 'red' }}>{errors.capacity}</span>}
      </div>
      <div>
        <label>Price per Hour</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} />
        {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
      </div>
      <div style={{ marginTop: 20 }}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Venue'}
        </button>
      </div>
    </form>
  );
};

export default VenueAdd; 
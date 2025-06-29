import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { venueService } from '../../services/api';

const VenueAddTest = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    venueName: '',
    partner: '',
    location: '',
    capacity: '',
    price: '',
    bookings: '',
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    setIsSubmitting(true);
    setApiError("");

    try {
      // Call your addVenue API method with formData
      const response = await venueService.addVenue(formData);

      console.log("Venue added successfully:", response);

      // Optional small delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      alert("Venue added successfully!");

      // Reset form fields
      setFormData({
        venueName: '',
        partner: '',
        location: '',
        capacity: '',
        price: '',
        bookings: '',
        status: '',
      });

      // Redirect after success
      navigate('/admin/venues');
    } catch (error) {
      console.error("Venue add failed:", error);

      if (error.response) {
        if (error.response.status === 409) {
          setApiError("Venue with this name already exists.");
        } else if (error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Venue add failed. Please try again later.");
        }
      } else {
        setApiError("Unable to connect to the server. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
 };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Venue</h2>
      {apiError && <div style={{ color: 'red', marginBottom: '10px' }}>{apiError}</div>}
      }
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
          {errors[field] && <span style={{ color: 'red' }}>{errors[field]}</span>}
          }
        </div>
      ))}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Venue'}
      </button>
    </form>
  );
};

export default VenueAddTest;
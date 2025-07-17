"use client"

import { useState, useEffect } from "react"
import { bookingService } from "../../services/api"
import "../../styles/venue-booking.css"
import "../../styles/modern-components.css"
import Header from "./Header"

const VenueBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    venueName: "Grand Ballroom",
    date: "",
    startTime: "",
    duration: "4",
    guests: "",
    specialRequests: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.date) {
      errors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = "Please select a future date";
      }
    }
    
    if (!formData.startTime) {
      errors.startTime = "Please select a start time";
    }
    
    if (!formData.guests || parseInt(formData.guests) < 1) {
      errors.guests = "Please enter number of guests";
    } else if (parseInt(formData.guests) > 1000) {
      errors.guests = "Maximum capacity is 1000 guests";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const bookingData = {
        venueName: formData.venueName,
        eventDate: formData.date,
        startTime: formData.startTime,
        duration: parseInt(formData.duration),
        numberOfGuests: parseInt(formData.guests),
        specialRequests: formData.specialRequests || "",
        status: "pending"
      };

      console.log("Submitting booking:", bookingData);
      const response = await bookingService.createBooking(bookingData);
      console.log("Booking created successfully:", response);
      
      setSuccess(true);
      setFormData({
        venueName: "Grand Ballroom",
        date: "",
        startTime: "",
        duration: "4",
        guests: "",
        specialRequests: ""
      });
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error("Booking submission failed:", error);
      if (error.response?.status === 401) {
        setError("Please log in to make a booking.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to submit booking. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="venue-booking-page">
      <Header />
      
      <section className="venue-hero-section">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=400&fit=crop&crop=center"
          alt="Wedding planning materials"
          className="venue-hero-background"
        />
        <div className="venue-hero-content">
          <h1 className="venue-hero-title">Book Your Perfect Venue</h1>
          <div className="venue-hero-tagline">
            <p className="venue-hero-text-primary">We bring</p>
            <p className="venue-hero-text-highlight">dream events</p>
            <p className="venue-hero-text-primary">to life!</p>
          </div>
        </div>
      </section>

      <main className="venue-main-content">
        <div className="venue-content-grid">
          {/* Venue Details */}
          <div className="venue-details-section">
            <h2 className="venue-details-title">Grand Ballroom</h2>
            
            {/* Image Carousel */}
            <div className="venue-image-carousel">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f29c8e8d4b?w=800&h=400&fit=crop"
                alt="Grand Ballroom"
                className="venue-carousel-image"
              />
            </div>

            {/* Rating */}
            <div className="venue-rating-section">
              <div className="venue-rating-container">
                <div className="venue-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="venue-star-icon">★</span>
                  ))}
                </div>
                <span className="venue-rating-number">4.8</span>
                <span className="venue-rating-count">(124 reviews)</span>
              </div>
            </div>

            {/* Venue Info */}
            <div className="venue-tabs-container">
              <div className="venue-tab-content">
                <div className="venue-about-section">
                  <h3 className="venue-section-heading">About this venue</h3>
                  <p className="venue-description-text">
                    Our Grand Ballroom is perfect for weddings, corporate events, and special celebrations. 
                    With elegant décor and modern amenities, it provides the ideal setting for your memorable event.
                  </p>
                  
                  <div className="venue-info-grid">
                    <div className="venue-info-item">
                      <div className="venue-info-heading">
                        <span>👥</span> Capacity
                      </div>
                      <div className="venue-info-text">Up to 500 guests</div>
                    </div>
                    <div className="venue-info-item">
                      <div className="venue-info-heading">
                        <span>📍</span> Location
                      </div>
                      <div className="venue-info-text">Kathmandu, Nepal</div>
                    </div>
                    <div className="venue-info-item">
                      <div className="venue-info-heading">
                        <span>🕒</span> Duration
                      </div>
                      <div className="venue-info-text">Flexible timing</div>
                    </div>
                    <div className="venue-info-item">
                      <div className="venue-info-heading">
                        <span>💰</span> Price
                      </div>
                      <div className="venue-info-text">NPR 15,000/hour</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="venue-booking-sidebar">
            <div className="venue-booking-card">
              <div className="venue-booking-header">
                <h3 className="venue-booking-title">Book this venue</h3>
                <p className="venue-booking-subtitle">Fill in the details below</p>
              </div>

              {/* Success Message */}
              {success && (
                <div style={{
                  background: '#d4edda',
                  color: '#155724',
                  padding: '12px',
                  margin: '16px',
                  borderRadius: '4px',
                  border: '1px solid #c3e6cb'
                }}>
                  ✅ Booking submitted successfully! We'll contact you soon.
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div style={{
                  background: '#f8d7da',
                  color: '#721c24',
                  padding: '12px',
                  margin: '16px',
                  borderRadius: '4px',
                  border: '1px solid #f5c6cb'
                }}>
                  ❌ {error}
                </div>
              )}

              <form className="venue-booking-form" onSubmit={handleSubmit}>
                <div className="venue-form-group">
                  <label className="venue-form-label">Event Date *</label>
                  <input
                    type="date"
                    className={`venue-form-input ${formErrors.date ? 'venue-input-error' : ''}`}
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {formErrors.date && (
                    <div className="venue-form-error">{formErrors.date}</div>
                  )}
                </div>

                <div className="venue-form-group">
                  <label className="venue-form-label">Start Time *</label>
                  <select
                    className={`venue-form-input ${formErrors.startTime ? 'venue-input-error' : ''}`}
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  >
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                  {formErrors.startTime && (
                    <div className="venue-form-error">{formErrors.startTime}</div>
                  )}
                </div>

                <div className="venue-form-group">
                  <label className="venue-form-label">Duration</label>
                  <select
                    className="venue-form-input"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  >
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="6">6 hours</option>
                    <option value="8">8 hours</option>
                    <option value="12">12 hours</option>
                  </select>
                </div>

                <div className="venue-form-group">
                  <label className="venue-form-label">Number of Guests *</label>
                  <input
                    type="number"
                    className={`venue-form-input ${formErrors.guests ? 'venue-input-error' : ''}`}
                    placeholder="Enter number of guests"
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    min="1"
                    max="1000"
                  />
                  {formErrors.guests && (
                    <div className="venue-form-error">{formErrors.guests}</div>
                  )}
                </div>

                <div className="venue-form-group">
                  <label className="venue-form-label">Special Requests</label>
                  <textarea
                    className="venue-form-textarea"
                    placeholder="Any special requirements or requests..."
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows="3"
                  />
                </div>

                <button 
                  type="submit" 
                  className="venue-continue-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Booking Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default VenueBooking
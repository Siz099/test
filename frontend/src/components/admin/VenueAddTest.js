import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiBell,
  FiSettings,
  FiUser,
  FiLogOut
} from 'react-icons/fi';
import '../../styles/admin/AdminPanel.css';
// import { venueService } from '../../services/api'; // Not used for now

const steps = [
  'Basic Information',
  'Location & Contact',
  'Location Map',
  'Pricing & Availability',
  'Amenities & Features',
  'Photo & Media',
  'Terms & Policies',
];

const initialFormData = {
  // Step 1: Basic Information
  venueName: '',
  description: '',
  venueType: '',
  capacity: '',
  // Step 2: Location & Contact
  fullAddress: '',
  city: '',
  district: '',
  province: '',
  contactPhone: '',
  contactEmail: '',
  // Step 3: Location Map
  mapLocation: '', // Placeholder for now
  // Step 4: Pricing & Availability
  pricePerHour: '',
  minBookingHours: '',
  openingTime: '',
  closingTime: '',
  // Step 5: Amenities & Features
  amenities: [],
  // Step 6: Photo & Media
  mainPhoto: '',
  additionalPhotos: '',
  floorPlan: '',
  // Step 7: Terms & Policies
  terms: '',
  agree: false,
};

const amenitiesList = [
  'WiFi', 'Parking', 'Air Conditioning', 'Projector', 'Sound System', 'Catering', 'Stage', 'Wheelchair Access',
];

const VenueAddTest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/partners', icon: <FiBriefcase />, label: 'Partners' },
    { path: '/admin/venues', icon: <FiMapPin />, label: 'Venues' },
    { path: '/admin/bookings', icon: <FiCalendar />, label: 'Bookings' },
    { path: '/admin/notifications', icon: <FiBell />, label: 'Notifications' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' },
    { path: '/admin/profile', icon: <FiUser />, label: 'Profile' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'agree') {
      setFormData((prev) => ({ ...prev, agree: checked }));
    } else if (type === 'checkbox' && name === 'amenities') {
      setFormData((prev) => {
        const newAmenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value);
        return { ...prev, amenities: newAmenities };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    // Only validate fields for the current step
    if (step === 0) {
      if (!formData.venueName) newErrors.venueName = 'Venue Name is required';
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.venueType) newErrors.venueType = 'Venue Type is required';
      if (!formData.capacity) newErrors.capacity = 'Capacity is required';
    } else if (step === 1) {
      if (!formData.fullAddress) newErrors.fullAddress = 'Full Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.district) newErrors.district = 'District is required';
      if (!formData.province) newErrors.province = 'Province is required';
      if (!formData.contactPhone) newErrors.contactPhone = 'Contact phone is required';
      if (!formData.contactEmail) newErrors.contactEmail = 'Contact email is required';
    } else if (step === 2) {
      // Map location is optional for now
    } else if (step === 3) {
      if (!formData.pricePerHour) newErrors.pricePerHour = 'Price per hour is required';
      if (!formData.minBookingHours) newErrors.minBookingHours = 'Minimum booking hours required';
      if (!formData.openingTime) newErrors.openingTime = 'Opening time required';
      if (!formData.closingTime) newErrors.closingTime = 'Closing time required';
    } else if (step === 4) {
      // Amenities optional for now
    } else if (step === 5) {
      if (!formData.mainPhoto) newErrors.mainPhoto = 'Main photo is required';
      // Additional photos and floor plan optional for now
    } else if (step === 6) {
      if (!formData.terms) newErrors.terms = 'Terms & Policies required';
      if (!formData.agree) newErrors.agree = 'You must agree to the terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert('Venue submitted for review!');
      // Reset form or redirect as needed
      setFormData(initialFormData);
      setStep(0);
      // navigate('/admin/venues');
    }
  };

  // --- Step Components ---
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <section className="venue-section">
            <h3>Basic Information</h3>
            <div>
              <label>Venue Name:</label>
              <input name="venueName" value={formData.venueName} onChange={handleChange} />
              {errors.venueName && <span className="error">{errors.venueName}</span>}
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} />
              {errors.description && <span className="error">{errors.description}</span>}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Venue Type:</label>
                <input name="venueType" value={formData.venueType} onChange={handleChange} />
                {errors.venueType && <span className="error">{errors.venueType}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label>Capacity:</label>
                <input name="capacity" value={formData.capacity} onChange={handleChange} />
                {errors.capacity && <span className="error">{errors.capacity}</span>}
              </div>
            </div>
          </section>
        );
      case 1:
        return (
          <section className="venue-section">
            <h3>Location & Contact</h3>
            <div>
              <label>Full Address:</label>
              <input name="fullAddress" value={formData.fullAddress} onChange={handleChange} />
              {errors.fullAddress && <span className="error">{errors.fullAddress}</span>}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>City:</label>
                <input name="city" value={formData.city} onChange={handleChange} />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label>District:</label>
                <input name="district" value={formData.district} onChange={handleChange} />
                {errors.district && <span className="error">{errors.district}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label>Province:</label>
                <input name="province" value={formData.province} onChange={handleChange} />
                {errors.province && <span className="error">{errors.province}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Contact phone:</label>
                <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
                {errors.contactPhone && <span className="error">{errors.contactPhone}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label>Contact Email:</label>
                <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                {errors.contactEmail && <span className="error">{errors.contactEmail}</span>}
              </div>
            </div>
          </section>
        );
      case 2:
        return (
          <section className="venue-section">
            <h3>Location</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ width: '100%', height: '200px', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>Map Placeholder</span>
              </div>
            </div>
            <div>
              <label>Address:</label>
              <input name="mapLocation" value={formData.mapLocation} onChange={handleChange} placeholder="Map address (optional)" />
            </div>
          </section>
        );
      case 3:
        return (
          <section className="venue-section">
            <h3>Pricing & Availability</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Price Per Hour (PKR):</label>
                <input name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} />
                {errors.pricePerHour && <span className="error">{errors.pricePerHour}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label>Minimum Booking Hours:</label>
                <input name="minBookingHours" value={formData.minBookingHours} onChange={handleChange} />
                {errors.minBookingHours && <span className="error">{errors.minBookingHours}</span>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Opening Time:</label>
                <input name="openingTime" value={formData.openingTime} onChange={handleChange} />
                {errors.openingTime && <span className="error">{errors.openingTime}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <label>Closing Time:</label>
                <input name="closingTime" value={formData.closingTime} onChange={handleChange} />
                {errors.closingTime && <span className="error">{errors.closingTime}</span>}
              </div>
            </div>
          </section>
        );
      case 4:
        return (
          <section className="venue-section">
            <h3>Amenities & Features</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {amenitiesList.map((amenity) => (
                <label key={amenity} style={{ minWidth: '150px' }}>
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </section>
        );
      case 5:
        return (
          <section className="venue-section">
            <h3>Photo & Media</h3>
            <div>
              <label>Main Photo/Cover Image:</label>
              <input
                type="file"
                name="mainPhoto"
                accept="image/*"
                onChange={e => {
                  setFormData(prev => ({ ...prev, mainPhoto: e.target.files[0] }));
                }}
              />
              {formData.mainPhoto && typeof formData.mainPhoto === 'object' && (
                <span style={{ marginLeft: 8 }}>{formData.mainPhoto.name}</span>
              )}
              {errors.mainPhoto && <span className="error">{errors.mainPhoto}</span>}
            </div>
            <div>
              <label>Additional Photos (min 2):</label>
              <input
                type="file"
                name="additionalPhotos"
                accept="image/*"
                multiple
                onChange={e => {
                  setFormData(prev => ({ ...prev, additionalPhotos: Array.from(e.target.files) }));
                }}
              />
              {Array.isArray(formData.additionalPhotos) && formData.additionalPhotos.length > 0 && (
                <ul style={{ margin: '8px 0 0 0', padding: 0, listStyle: 'none' }}>
                  {formData.additionalPhotos.map((file, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label>Floor Plan (Optional):</label>
              <input
                type="file"
                name="floorPlan"
                accept="image/*"
                onChange={e => {
                  setFormData(prev => ({ ...prev, floorPlan: e.target.files[0] }));
                }}
              />
              {formData.floorPlan && typeof formData.floorPlan === 'object' && (
                <span style={{ marginLeft: 8 }}>{formData.floorPlan.name}</span>
              )}
            </div>
          </section>
        );
      case 6:
        return (
          <section className="venue-section">
            <h3>Term & Policies</h3>
            <div>
              <textarea name="terms" value={formData.terms} onChange={handleChange} placeholder="Enter terms and policies" style={{ width: '100%', minHeight: '80px' }} />
              {errors.terms && <span className="error">{errors.terms}</span>}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                I confirm that all information provided is accurate and I agree to the Terms and Conditions
              </label>
              {errors.agree && <span className="error">{errors.agree}</span>}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  // --- Main Render ---
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h1>Admin Panel</h1>
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-item logout-button">
            <span className="sidebar-icon"><FiLogOut /></span>
            <span className="sidebar-label">Logout</span>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <main className="main-content">
        <div className="content-header">
          <h2>Add New Venue</h2>
        </div>
        <div className="content-body">
          {/* The multi-step form UI */}
          <div style={{ background: '#f0f0f0', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: '2rem' }}>
              {/* Remove duplicate h2, keep progress and form only */}
              <div style={{ marginBottom: '2rem', color: '#888' }}>
                Register a new venue to your account
              </div>
              {/* Progress Indicator */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {steps.map((s, idx) => (
                  <div key={s} style={{
                    flex: 1,
                    padding: 6,
                    background: idx === step ? '#b2ebf2' : '#e0e0e0',
                    borderRadius: 4,
                    textAlign: 'center',
                    fontWeight: idx === step ? 'bold' : 'normal',
                    fontSize: 13,
                  }}>{s}</div>
                ))}
              </div>
              <form onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}>
                {renderStep()}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    style={{ background: '#f44336', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontWeight: 'bold', opacity: step === 0 ? 0.5 : 1 }}
                  >
                    Back
                  </button>
                  {step < steps.length - 1 ? (
                    <button
                      type="submit"
                      style={{ background: '#009688', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontWeight: 'bold' }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      style={{ background: '#4caf50', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontWeight: 'bold' }}
                    >
                      Submit for Review
                    </button>
                  )}
                </div>
              </form>
            </div>
            <style>{`
              .venue-section { margin-bottom: 2rem; }
              .venue-section label { display: block; margin-bottom: 4px; font-weight: 500; }
              .venue-section input, .venue-section textarea {
                width: 100%;
                padding: 8px;
                margin-bottom: 12px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 15px;
              }
              .venue-section textarea { resize: vertical; }
              .error { color: #f44336; font-size: 13px; margin-left: 8px; }
            `}</style>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VenueAddTest;
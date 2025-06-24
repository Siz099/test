"use client"

import { useState } from "react"
import "../styles/venue-booking.css"
import PaymentPage from "./PaymentPage"
import "../styles/modern-components.css"
import Header from "./Header"
import Footer from "./Footer"

const VenueBooking = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("details")
  const [showReview, setShowReview] = useState(false)
  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    duration: "2",
    guests: "",
    specialRequest: "",
  })

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  // Add these new state variables after the existing useState declarations
  const [dateError, setDateError] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("error") // "error" or "success"

  // Mock data for time slot availability (in real app, this would come from API)
  const timeSlotAvailability = {
    "2024-01-15": ["09:00", "10:00", "14:00", "15:00"], // Available slots for this date
    "2024-01-16": ["11:00", "12:00", "16:00", "17:00"],
    "2024-01-17": ["09:00", "13:00", "14:00", "18:00"],
  }

  // Mock data for booked dates and blackout dates (in real app, this would come from API)
  const bookedDates = [
    "2024-01-20",
    "2024-01-25",
    "2024-02-14", // Valentine's Day - popular wedding date
    "2024-02-15",
    "2024-03-15",
    "2024-03-22",
  ]

  const blackoutDates = [
    "2024-01-01", // New Year's Day
    "2024-12-25", // Christmas
    "2024-12-31", // New Year's Eve
    "2024-07-04", // Independence Day (if applicable)
    "2024-11-28", // Thanksgiving (if applicable)
  ]

  // Using realistic placeholder images for wedding venues
  const venueImages = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=300&fit=crop&crop=center",
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % venueImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + venueImages.length) % venueImages.length)
  }

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Validate date when it changes
    if (field === "date") {
      validateDate(value)
    }
  }

  const showToastMessage = (message, type = "error") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  const handleContinueToReview = () => {
    // Validate all required fields
    const isDateValid = validateDate(bookingData.date)

    if (!isDateValid || !bookingData.startTime || !bookingData.guests) {
      if (!bookingData.startTime) showToastMessage("Please select a start time")
      if (!bookingData.guests) showToastMessage("Please enter number of guests")
      return
    }

    // Additional validation for guest capacity
    const guestWarning = getGuestCapacityWarning(bookingData.guests)
    if (guestWarning && guestWarning.type === "error") {
      showToastMessage(guestWarning.message)
      return
    }

    setShowReview(true)
  }

  const handleBackToBooking = () => {
    setShowReview(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options).replace(",", "nd,")
  }

  const formatTime = (timeString) => {
    if (!timeString) return ""
    return timeString
  }

  const calculateTotalPrice = () => {
    const pricePerHour = 15000
    const duration = Number.parseInt(bookingData.duration) || 2
    return pricePerHour * duration
  }

  const getAvailableTimeSlots = (selectedDate) => {
    if (!selectedDate) return []
    return (
      timeSlotAvailability[selectedDate] || [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ]
    )
  }

  const getGuestCapacityWarning = (guestCount) => {
    const maxCapacity = 500
    const warningThreshold = 0.8 // 80% of capacity

    if (!guestCount) return null

    const count = Number.parseInt(guestCount)
    if (count > maxCapacity) {
      return { type: "error", message: `Maximum capacity is ${maxCapacity} guests` }
    } else if (count > maxCapacity * warningThreshold) {
      return { type: "warning", message: `Approaching maximum capacity (${maxCapacity} guests)` }
    }
    return null
  }

  const calculateDetailedPricing = () => {
    const basePrice = 15000
    const duration = Number.parseInt(bookingData.duration) || 2
    const guestCount = Number.parseInt(bookingData.guests) || 0

    const subtotal = basePrice * duration
    const serviceCharge = Math.round(subtotal * 0.1) // 10% service charge
    const tax = Math.round((subtotal + serviceCharge) * 0.13) // 13% VAT
    const guestFee = guestCount > 100 ? (guestCount - 100) * 50 : 0 // Extra fee for guests over 100

    const total = subtotal + serviceCharge + tax + guestFee

    return {
      basePrice,
      duration,
      subtotal,
      serviceCharge,
      tax,
      guestFee,
      total,
    }
  }

  const openLightbox = (index) => {
    setLightboxImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % venueImages.length)
  }

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + venueImages.length) % venueImages.length)
  }

  // Add these validation functions after the existing functions:

  const validateDate = (selectedDate) => {
    if (!selectedDate) {
      setDateError("Please select a date")
      return false
    }

    const today = new Date()
    const selected = new Date(selectedDate)
    const minAdvanceDate = new Date()
    const maxAdvanceDate = new Date()

    // Set time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0)
    selected.setHours(0, 0, 0, 0)

    // Minimum 3 days advance booking
    minAdvanceDate.setDate(today.getDate() + 3)
    minAdvanceDate.setHours(0, 0, 0, 0)

    // Maximum 1 year advance booking
    maxAdvanceDate.setFullYear(today.getFullYear() + 1)
    maxAdvanceDate.setHours(0, 0, 0, 0)

    // Check if date is in the past
    if (selected < today) {
      setDateError("Cannot select past dates")
      return false
    }

    // Check minimum advance booking
    if (selected < minAdvanceDate) {
      setDateError("Bookings must be made at least 3 days in advance")
      return false
    }

    // Check maximum advance booking
    if (selected > maxAdvanceDate) {
      setDateError("Bookings can only be made up to 1 year in advance")
      return false
    }

    // Check if date is fully booked
    if (bookedDates.includes(selectedDate)) {
      setDateError("This date is fully booked. Please select another date.")
      return false
    }

    // Check if date is a blackout date
    if (blackoutDates.includes(selectedDate)) {
      setDateError("This date is not available for bookings")
      return false
    }

    // Check day of week restrictions (example: no bookings on Mondays)
    const dayOfWeek = selected.getDay()
    if (dayOfWeek === 1) {
      // Monday = 1
      setDateError("Bookings are not available on Mondays")
      return false
    }

    // If all validations pass
    setDateError("")
    return true
  }

  const getMinDate = () => {
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 3) // 3 days from today
    return minDate.toISOString().split("T")[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1) // 1 year from today
    return maxDate.toISOString().split("T")[0]
  }

  const isDateUnavailable = (dateString) => {
    return bookedDates.includes(dateString) || blackoutDates.includes(dateString)
  }

  const getDateStatus = (dateString) => {
    if (bookedDates.includes(dateString)) return "booked"
    if (blackoutDates.includes(dateString)) return "blackout"

    const date = new Date(dateString)
    const today = new Date()
    const minAdvanceDate = new Date()
    minAdvanceDate.setDate(today.getDate() + 3)

    if (date < today) return "past"
    if (date < minAdvanceDate) return "too-soon"
    if (date.getDay() === 1) return "restricted" // Monday

    return "available"
  }

  const handleProceedToPayment = () => {
    setShowPayment(true)
  }

  const handleBackFromPayment = () => {
    setShowPayment(false)
  }

  const StarIcon = () => (
    <svg className="venue-star-icon" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  const ChevronLeft = () => (
    <svg className="venue-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15,18 9,12 15,6"></polyline>
    </svg>
  )

  const ChevronRight = () => (
    <svg className="venue-chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9,18 15,12 9,6"></polyline>
    </svg>
  )

  const CalendarIcon = () => (
    <svg className="venue-calendar-icon" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
        clipRule="evenodd"
      />
    </svg>
  )

  const UsersIcon = () => (
    <svg className="venue-info-icon" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  )

  const DollarIcon = () => (
    <svg className="venue-info-icon" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
        clipRule="evenodd"
      />
    </svg>
  )

  const MapPinIcon = () => (
    <svg className="venue-info-icon" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  )

  if (showPayment) {
    return <PaymentPage bookingData={bookingData} onBack={handleBackFromPayment} />
  }

  return (
    <div className="venue-booking-page">
      {/* ADD HEADER HERE - At the very top */}
      <Header />
      {/* Hero Section */}
      <section className="venue-hero-section">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=400&fit=crop&crop=center"
          alt="Wedding planning materials"
          className="venue-hero-background"
        />
        <div className="venue-hero-content">
          <h1 className="venue-hero-title">We are &lt;Company Name&gt;</h1>
          <div className="venue-hero-tagline">
            <p className="venue-hero-text-primary">We bring</p>
            <p className="venue-hero-text-highlight">dream weddings</p>
            <p className="venue-hero-text-primary">to life!</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="venue-main-content">
        <div className="venue-content-grid">
          {/* Left Column - Venue Details */}
          <div className="venue-details-section">
            <h2 className="venue-details-title">Grand Ballroom</h2>

            {/* Image Carousel */}
            <div className="venue-image-carousel">
              <img
                src={venueImages[currentImageIndex] || "/placeholder.svg"}
                alt="Grand Ballroom"
                className="venue-carousel-image venue-clickable-image"
                onClick={() => openLightbox(currentImageIndex)}
              />
              <button className="venue-carousel-btn venue-carousel-btn-left" onClick={prevImage}>
                <ChevronLeft />
              </button>
              <button className="venue-carousel-btn venue-carousel-btn-right" onClick={nextImage}>
                <ChevronRight />
              </button>
              <div className="venue-image-thumbnails">
                {venueImages.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Venue ${index + 1}`}
                    className={`venue-thumbnail ${index === currentImageIndex ? "venue-thumbnail-active" : ""}`}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      openLightbox(index)
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="venue-rating-section">
              <div className="venue-rating-container">
                <div className="venue-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} />
                  ))}
                </div>
                <span className="venue-rating-number">5</span>
                <span className="venue-rating-count">(22)</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="venue-tabs-container">
              <div className="venue-tabs-list">
                <button
                  className={`venue-tab-trigger ${activeTab === "details" ? "venue-tab-active" : ""}`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  className={`venue-tab-trigger ${activeTab === "amenities" ? "venue-tab-active" : ""}`}
                  onClick={() => setActiveTab("amenities")}
                >
                  Amenities
                </button>
                <button
                  className={`venue-tab-trigger ${activeTab === "location" ? "venue-tab-active" : ""}`}
                  onClick={() => setActiveTab("location")}
                >
                  Location
                </button>
              </div>

              <div className="venue-tab-content">
                {activeTab === "details" && (
                  <div className="venue-about-section">
                    <h3 className="venue-section-heading">About The Venue</h3>
                    <p className="venue-description-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    </p>

                    <div className="venue-info-grid">
                      <div className="venue-info-item">
                        <h4 className="venue-info-heading">
                          <UsersIcon />
                          Capacity
                        </h4>
                        <p className="venue-info-text">Up to 500 people</p>
                      </div>

                      <div className="venue-info-item">
                        <h4 className="venue-info-heading">
                          <DollarIcon />
                          Pricing
                        </h4>
                        <p className="venue-info-text">NPR 15,000 per hour</p>
                      </div>

                      <div className="venue-info-item">
                        <h4 className="venue-info-heading">
                          <MapPinIcon />
                          Location
                        </h4>
                        <p className="venue-info-text">Kathmandu, Nepal</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div className="venue-about-section">
                    <h3 className="venue-section-heading">Available Amenities</h3>
                    <div className="venue-amenities-grid">
                      <div className="venue-amenities-column">
                        <div className="venue-amenity-item">
                          <span className="venue-amenity-bullet">•</span>
                          <span className="venue-amenity-text">Air Conditioner</span>
                        </div>
                        <div className="venue-amenity-item">
                          <span className="venue-amenity-bullet">•</span>
                          <span className="venue-amenity-text">Projector</span>
                        </div>
                        <div className="venue-amenity-item">
                          <span className="venue-amenity-bullet">•</span>
                          <span className="venue-amenity-text">Dance Floor</span>
                        </div>
                        <div className="venue-amenity-item">
                          <span className="venue-amenity-bullet">•</span>
                          <span className="venue-amenity-text">Parking</span>
                        </div>
                      </div>
                      <div className="venue-amenities-column">
                        <div className="venue-amenity-item">
                          <span className="venue-amenity-bullet">•</span>
                          <span className="venue-amenity-text">Sound System</span>
                        </div>
                        <div className="venue-amenity-item">
                          <span className="venue-amenity-bullet">•</span>
                          <span className="venue-amenity-text">Stage</span>
                        </div>
                        <div className="venue-amenity-item">
                          <span className="venue-amenity-bullet">•</span>
                          <span className="venue-amenity-text">Catering Service</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "location" && (
                  <div className="venue-about-section">
                    <h3 className="venue-section-heading">Location</h3>
                    <div className="venue-location-info">
                      <p className="venue-description-text">
                        <strong>Address:</strong> Kathmandu, Nepal
                      </p>
                      <div className="venue-map-container">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.4041494859!2d85.2479852!3d27.7172453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                          width="100%"
                          height="300"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Venue Location"
                          className="venue-map-iframe"
                        ></iframe>
                      </div>
                      <div className="venue-location-details">
                        <div className="venue-location-item">
                          <strong className="venue-location-label">Getting There:</strong>
                          <p className="venue-location-description">
                            Easily accessible by car, taxi, or public transportation. Ample parking available on-site.
                          </p>
                        </div>
                        <div className="venue-location-item">
                          <strong className="venue-location-label">Nearby Landmarks:</strong>
                          <p className="venue-location-description">
                            Close to major hotels, restaurants, and shopping centers in Kathmandu.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form or Review */}
          <aside className="venue-booking-sidebar">
            {!showReview ? (
              /* Booking Form */
              <div className="venue-booking-card">
                <div className="venue-booking-header">
                  <h3 className="venue-booking-title">Book this venue</h3>
                  <p className="venue-booking-subtitle">Select your booking details</p>
                </div>
                <div className="venue-booking-form">
                  <div className="venue-form-group">
                    <label className="venue-form-label" htmlFor="venue-date">
                      Select Date *
                    </label>
                    <div className="venue-date-input-container">
                      <input
                        id="venue-date"
                        type="date"
                        className={`venue-form-input venue-date-input ${dateError ? "venue-input-error" : ""}`}
                        placeholder="Pick a date"
                        value={bookingData.date}
                        min={getMinDate()}
                        max={getMaxDate()}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                      />
                      <CalendarIcon />
                    </div>
                    {dateError && <p className="venue-form-error">{dateError}</p>}
                  </div>

                  <div className="venue-form-group">
                    <label className="venue-form-label" htmlFor="venue-start-time">
                      Select start time
                    </label>
                    <select
                      id="venue-start-time"
                      className="venue-form-select"
                      value={bookingData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                    >
                      <option value="">Select time</option>
                      {getAvailableTimeSlots(bookingData.date).map((time) => (
                        <option key={time} value={time}>
                          {time === "12:00"
                            ? "12:00 PM"
                            : Number.parseInt(time.split(":")[0]) > 12
                              ? `${Number.parseInt(time.split(":")[0]) - 12}:${time.split(":")[1]} PM`
                              : `${time} AM`}
                        </option>
                      ))}
                    </select>
                    {bookingData.date && getAvailableTimeSlots(bookingData.date).length === 0 && (
                      <p className="venue-form-warning">No available time slots for this date</p>
                    )}
                  </div>

                  <div className="venue-form-group">
                    <label className="venue-form-label" htmlFor="venue-duration">
                      Duration (Hours)
                    </label>
                    <select
                      id="venue-duration"
                      className="venue-form-select"
                      value={bookingData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="5">5 hours</option>
                      <option value="6">6 hours</option>
                      <option value="8">8 hours</option>
                    </select>
                  </div>

                  <div className="venue-form-group">
                    <label className="venue-form-label" htmlFor="venue-guests">
                      Number of guests
                    </label>
                    <input
                      id="venue-guests"
                      type="number"
                      className="venue-form-input"
                      placeholder="Enter number of guest"
                      min="1"
                      max="500"
                      value={bookingData.guests}
                      onChange={(e) => handleInputChange("guests", e.target.value)}
                    />
                    <p className="venue-form-note">Maximum capacity: 500 people</p>
                    {getGuestCapacityWarning(bookingData.guests) && (
                      <p className={`venue-capacity-warning ${getGuestCapacityWarning(bookingData.guests).type}`}>
                        {getGuestCapacityWarning(bookingData.guests).message}
                      </p>
                    )}
                  </div>

                  <div className="venue-form-group">
                    <label className="venue-form-label" htmlFor="venue-special-request">
                      Any special Request
                    </label>
                    <textarea
                      id="venue-special-request"
                      className="venue-form-textarea"
                      placeholder="Write your any special request"
                      value={bookingData.specialRequest}
                      onChange={(e) => handleInputChange("specialRequest", e.target.value)}
                    ></textarea>
                    <p className="venue-form-note">Charge will be managed accordingly</p>
                  </div>

                  <button className="venue-continue-btn" onClick={handleContinueToReview}>
                    Continue to review
                  </button>
                </div>
              </div>
            ) : (
              /* Review/Checkout */
              <div className="venue-review-card">
                <div className="venue-review-header">
                  <h3 className="venue-review-title">Book this venue</h3>
                  <p className="venue-review-subtitle">Review and confirm your booking</p>
                </div>
                <div className="venue-review-content">
                  <div className="venue-review-details">
                    <div className="venue-review-item">
                      <h4 className="venue-review-label">Venue</h4>
                      <p className="venue-review-value">Grand Ballroom</p>
                    </div>

                    <div className="venue-review-item">
                      <h4 className="venue-review-label">Date</h4>
                      <p className="venue-review-value">{formatDate(bookingData.date)}</p>
                    </div>

                    <div className="venue-review-item">
                      <h4 className="venue-review-label">Time</h4>
                      <p className="venue-review-value">{formatTime(bookingData.startTime)}</p>
                    </div>

                    <div className="venue-review-item">
                      <h4 className="venue-review-label">Duration</h4>
                      <p className="venue-review-value">{bookingData.duration} hours</p>
                    </div>

                    <div className="venue-review-item">
                      <h4 className="venue-review-label">Number of guests</h4>
                      <p className="venue-review-value">{bookingData.guests}</p>
                    </div>
                  </div>

                  <div className="venue-review-pricing">
                    {(() => {
                      const pricing = calculateDetailedPricing()
                      return (
                        <>
                          <div className="venue-pricing-row">
                            <span className="venue-pricing-label">
                              Base price (NPR {pricing.basePrice.toLocaleString()} × {pricing.duration} hours)
                            </span>
                            <span className="venue-pricing-value">NPR {pricing.subtotal.toLocaleString()}</span>
                          </div>
                          <div className="venue-pricing-row">
                            <span className="venue-pricing-label">Service charge (10%)</span>
                            <span className="venue-pricing-value">NPR {pricing.serviceCharge.toLocaleString()}</span>
                          </div>
                          <div className="venue-pricing-row">
                            <span className="venue-pricing-label">VAT (13%)</span>
                            <span className="venue-pricing-value">NPR {pricing.tax.toLocaleString()}</span>
                          </div>
                          {pricing.guestFee > 0 && (
                            <div className="venue-pricing-row">
                              <span className="venue-pricing-label">
                                Additional guest fee ({bookingData.guests - 100} guests over 100)
                              </span>
                              <span className="venue-pricing-value">NPR {pricing.guestFee.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="venue-pricing-row venue-pricing-total">
                            <span className="venue-pricing-label">Total Price</span>
                            <span className="venue-pricing-value">NPR {pricing.total.toLocaleString()}</span>
                          </div>
                        </>
                      )
                    })()}
                  </div>

                  <p className="venue-review-terms">By proceeding to payment, you agree to our terms and conditions.</p>

                  <div className="venue-review-actions">
                    <button className="venue-proceed-btn" onClick={handleProceedToPayment}>
                      Proceed to Payment
                    </button>
                    <button className="venue-back-btn" onClick={handleBackToBooking}>
                      Back to booking details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* ADD FOOTER HERE - At the very bottom */}
      <Footer />
      {/* Image Lightbox */}
      {lightboxOpen && (
        <div className="venue-lightbox-overlay" onClick={closeLightbox}>
          <div className="venue-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="venue-lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            <button className="venue-lightbox-nav venue-lightbox-prev" onClick={prevLightboxImage}>
              <ChevronLeft />
            </button>
            <img
              src={venueImages[lightboxImageIndex] || "/placeholder.svg"}
              alt={`Venue ${lightboxImageIndex + 1}`}
              className="venue-lightbox-image"
            />
            <button className="venue-lightbox-nav venue-lightbox-next" onClick={nextLightboxImage}>
              <ChevronRight />
            </button>
            <div className="venue-lightbox-counter">
              {lightboxImageIndex + 1} / {venueImages.length}
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {showToast && (
        <div className={`venue-toast venue-toast-${toastType}`}>
          <div className="venue-toast-content">
            <div className="venue-toast-icon">{toastType === "error" ? "⚠" : "✓"}</div>
            <span className="venue-toast-message">{toastMessage}</span>
            <button className="venue-toast-close" onClick={() => setShowToast(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VenueBooking

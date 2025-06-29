"use client"

import "../styles/venue-booking.css"
import "../styles/modern-components.css"
import Header from "./Header"

const VenueBooking = () => {
  // [Previous code remains the same until the return statement]

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
          <h1 className="venue-hero-title">We are Our Company</h1>
          <div className="venue-hero-tagline">
            <p className="venue-hero-text-primary">We bring</p>
            <p className="venue-hero-text-highlight">dream weddings</p>
            <p className="venue-hero-text-primary">to life!</p>
          </div>
        </div>
      </section>

      {/* [Rest of the code remains the same] */}
    </div>
  )
}

export default VenueBooking
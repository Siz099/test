import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PopularVenues from "./PopularVenues";
import HeroSection from "./HeroSection";
import "../styles/VenuePage.css";

export default function VenuePage() {
  return (
    <div className="venue-page">
      <Header />
      <HeroSection />
      <div className="container">
        {/* Filter Section */}
        <div className="filter-section">
          <select className="dropdown">
            <option>No. of Guests</option>
          </select>
          <select className="dropdown">
            <option>Venue Type</option>
          </select>
          <select className="dropdown">
            <option>Space Preference</option>
          </select>
          <select className="dropdown">
            <option>Rating</option>
          </select>
          <button className="search-button">Search</button>
        </div>

        {/* Venues Section */}
        <div className="section-header">
          <h2 className="section-title">Venues</h2>
          <a href="/" className="view-all-link">
            View All (22)
          </a>
        </div>

        <div className="venue-grid">
          {/* Grand Ballroom */}
          <div className="venue-card">
            <div className="image-container">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Grand Ballroom" className="venue-image" />
              <div className="explore-overlay">Explore</div>
            </div>
            <div className="venue-content">
              <h3 className="venue-title">Grand Ballroom</h3>
              <p className="venue-location">Kathmandu, Nepal</p>
              <div className="venue-details">
                <span className="capacity-icon">👥</span>
                <span>Capacity: 500 people</span>
              </div>
              <div className="price-row">
                <span className="price">
                  NPR 15,000<span className="price-unit">/hour</span>
                </span>
              </div>
              <div className="stars">★★★★★</div>
              <button className="view-details-button">View Details</button>
            </div>
          </div>

          {/* Riverside Garden */}
          <div className="venue-card">
            <div className="image-container">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Riverside Garden" className="venue-image" />
              <div className="explore-overlay">Explore</div>
            </div>
            <div className="venue-content">
              <h3 className="venue-title">Riverside Garden</h3>
              <p className="venue-location">Kathmandu, Nepal</p>
              <div className="venue-details">
                <span className="capacity-icon">👥</span>
                <span>Capacity: 500 people</span>
              </div>
              <div className="price-row">
                <span className="price">
                  NPR 15,000<span className="price-unit">/hour</span>
                </span>
              </div>
              <div className="stars">★★★★★</div>
              <button className="view-details-button">View Details</button>
            </div>
          </div>

          {/* Conference Center */}
          <div className="venue-card">
            <div className="image-container">
              <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80" alt="Conference Center" className="venue-image" />
              <div className="explore-overlay">Explore</div>
            </div>
            <div className="venue-content">
              <h3 className="venue-title">Conference Center</h3>
              <p className="venue-location">Kathmandu, Nepal</p>
              <div className="venue-details">
                <span className="capacity-icon">👥</span>
                <span>Capacity: 500 people</span>
              </div>
              <div className="price-row">
                <span className="price">
                  NPR 15,000<span className="price-unit">/hour</span>
                </span>
              </div>
              <div className="stars">★★★★★</div>
              <button className="view-details-button">View Details</button>
            </div>
          </div>
        </div>
      </div>
      <PopularVenues />
      <Footer />
    </div>
  );
} 
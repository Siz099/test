"use client";

import React from "react";
import "../styles/PopularVenues.css";

const venues = [
  {
    id: 1,
    name: "Venue",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 22,
  },
  {
    id: 2,
    name: "Venue",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 22,
  },
  {
    id: 3,
    name: "Venue",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 22,
  },
  {
    id: 4,
    name: "Venue",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    reviews: 22,
  },
];

const PopularVenues = () => {
  return (
    <section className="popular-venue-section">
      <div className="popular-venue-header">
        <h2 className="popular-venue-title">Popular Venue</h2>
        <a href="#" className="popular-venue-viewall">View All (22)</a>
      </div>
      <div className="popular-venue-wrapper">
        <button className="popular-nav-btn popular-nav-left">&#8249;</button>
        <div className="popular-venue-grid">
          {venues.map((venue) => (
            <div className="popular-venue-card" key={venue.id}>
              <div className="popular-venue-image-container">
                <img src={venue.image} alt={venue.name} className="popular-venue-image" />
                <div className="popular-explore-overlay">Explore</div>
              </div>
              <div className="popular-venue-content">
                <h3 className="popular-venue-name">{venue.name}</h3>
                <div className="popular-venue-rating-row">
                  <span className="popular-venue-stars">{'★'.repeat(venue.rating)}</span>
                  <span className="popular-venue-rating-count">{venue.rating} ({venue.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="popular-nav-btn popular-nav-right">&#8250;</button>
      </div>
    </section>
  );
};

export default PopularVenues;

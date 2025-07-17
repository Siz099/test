"use client";

import React, { useState, useEffect } from "react";
import "../../styles/PopularVenues.css";
import VenueGrid from "./VenueGrid";
import { venueService } from "../../services/api";

const PopularVenues = ({ venues: propVenues }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularVenues = async () => {
      // If venues are passed as props, use them
      if (propVenues && propVenues.length > 0) {
        const popularVenues = propVenues.slice(0, 4).map((venue, index) => ({
          id: venue.venue_id || index + 1,
          name: venue.venueName || "Venue",
          image: `https://images.unsplash.com/photo-${1521737852567 + index}?auto=format&fit=crop&w=400&q=80`,
        }));
        setVenues(popularVenues);
        return;
      }

      // Otherwise fetch from API
      try {
        setLoading(true);
        const response = await venueService.listVenue();
        console.log("Popular venues fetched:", response);
        
        const venueList = Array.isArray(response) ? response.slice(0, 4) : [];
        const popularVenues = venueList.map((venue, index) => ({
          id: venue.venue_id || index + 1,
          name: venue.venueName || "Venue",
          image: `https://images.unsplash.com/photo-${1521737852567 + index}?auto=format&fit=crop&w=400&q=80`,
        }));
        
        setVenues(popularVenues);
        setError(null);
      } catch (error) {
        console.error("Error fetching popular venues:", error);
        // Use fallback data
        const fallbackVenues = [
          {
            id: 1,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
          },
          {
            id: 2,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
          },
          {
            id: 3,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
          },
          {
            id: 4,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
          },
        ];
        setVenues(fallbackVenues);
        setError("Could not load latest venues. Showing popular venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularVenues();
  }, [propVenues]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '60px 20px',
        textAlign: 'center',
        fontSize: '16px',
        color: '#666'
      }}>
        Loading popular venues...
      </div>
    );
  }

  return (
    <>
      {error && (
        <div style={{
          background: '#fff3cd',
          color: '#856404',
          padding: '12px',
          margin: '20px auto',
          borderRadius: '4px',
          border: '1px solid #ffeaa7',
          maxWidth: '1200px',
          textAlign: 'center'
        }}>
          ⚠️ {error}
        </div>
      )}
      <VenueGrid
        title="Popular Venues"
        viewAllText={`View All (${venues.length})`}
        venues={venues}
        currentPage={currentPage}
        totalPages={Math.ceil(venues.length / 4) || 1}
        onPageChange={handlePageChange}
        venueType="popular"
      />
    </>
  );
};

export default PopularVenues;

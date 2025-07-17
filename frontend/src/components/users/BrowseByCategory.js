"use client";

import { useState, useEffect } from "react";
import VenueGrid from "./VenueGrid";
import { venueService } from "../../services/api";

const BrowseByCategory = ({ venues: propVenues }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryVenues = async () => {
      // If venues are passed as props, use them
      if (propVenues && propVenues.length > 0) {
        const categoryVenues = propVenues.map((venue, index) => ({
          id: venue.venue_id || index + 1,
          name: venue.venueName || "Venue",
          image: `https://images.unsplash.com/photo-${1506744038136 + index}?auto=format&fit=crop&w=400&q=80`,
        }));
        setVenues(categoryVenues);
        return;
      }

      // Otherwise fetch from API
      try {
        setLoading(true);
        const response = await venueService.listVenue();
        console.log("Category venues fetched:", response);
        
        const venueList = Array.isArray(response) ? response : [];
        const categoryVenues = venueList.map((venue, index) => ({
          id: venue.venue_id || index + 1,
          name: venue.venueName || "Venue",
          image: `https://images.unsplash.com/photo-${1506744038136 + index}?auto=format&fit=crop&w=400&q=80`,
        }));
        
        setVenues(categoryVenues);
        setError(null);
      } catch (error) {
        console.error("Error fetching category venues:", error);
        // Use fallback data
        const fallbackVenues = [
          {
            id: 1,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          },
          {
            id: 2,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
          },
          {
            id: 3,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
          },
          {
            id: 4,
            name: "Venue",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
          },
        ];
        setVenues(fallbackVenues);
        setError("Could not load latest venues. Showing sample venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryVenues();
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
        Loading venue categories...
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
        title="Browse By Category"
        viewAllText={`View All (${venues.length})`}
        venues={venues}
        currentPage={currentPage}
        totalPages={Math.ceil(venues.length / 4) || 1}
        onPageChange={handlePageChange}
        venueType="default"
      />
    </>
  );
};

export default BrowseByCategory;

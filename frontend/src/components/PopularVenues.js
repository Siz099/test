"use client";

import React, { useState } from "react";
import "../styles/PopularVenues.css";
import VenueGrid from "./VenueGrid";

const popularVenues = [
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

const PopularVenues = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Adjust as needed for pagination

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <VenueGrid
      title="Popular Venues"
      viewAllText="View All (22)"
      venues={popularVenues}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      venueType="popular"
    />
  );
};

export default PopularVenues;

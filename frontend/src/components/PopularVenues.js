"use client";

import { useState } from "react";
import VenueGrid from ".//VenueGrid";

const PopularVenues = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const venues = [
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <VenueGrid
      title="Popular Venue"
      viewAllText="View All (1000)"
      venues={venues}
      currentPage={currentPage}
      totalPages={3}
      onPageChange={handlePageChange}
      venueType="popular"
    />
  );
};

export default PopularVenues;

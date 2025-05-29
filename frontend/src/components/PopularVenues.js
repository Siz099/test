"use client";

import { useState } from "react";
import VenueGrid from ".//VenueGrid";

const PopularVenues = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <VenueGrid
      title="Popular Venue"
      viewAllText="View All (1000)"
      venues={[1, 2, 3, 4]}
      currentPage={currentPage}
      totalPages={3}
      onPageChange={handlePageChange}
      venueType="popular"
    />
  );
};

export default PopularVenues;

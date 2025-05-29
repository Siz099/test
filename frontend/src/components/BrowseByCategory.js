"use client";

import { useState } from "react";
import VenueGrid from "./VenueGrid";

const BrowseByCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <VenueGrid
      title="Browse By Category"
      viewAllText="View All (6)"
      venues={[1, 2, 3, 4]}
      currentPage={currentPage}
      totalPages={3}
      onPageChange={handlePageChange}
      venueType="default"
    />
  );
};

export default BrowseByCategory;

"use client";

import { useState } from "react";
import VenueGrid from "./VenueGrid";

const BrowseByCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const venues = [
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
    {
      id: 5,
      name: "Venue",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Venue",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 7,
      name: "Venue",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <VenueGrid
      title="Browse By Category"
      viewAllText="View All (10)"
      venues={venues}
      currentPage={currentPage}
      totalPages={3}
      onPageChange={handlePageChange}
      venueType="default"
    />
  );
};

export default BrowseByCategory;

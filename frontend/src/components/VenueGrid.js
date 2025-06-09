"use client";

import { motion } from "framer-motion";
import "../styles/VenueGrid.css";

const VenueGrid = ({
  title,
  viewAllText,
  venues = [],
  currentPage = 1,
  totalPages = 3,
  onPageChange,
  venueType = "default",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.section
      className="venue-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="section-header">
        <h2>{title}</h2>
        <a href="/" className="view-all">
          {viewAllText}
        </a>
      </div>
      <div className="venue-grid">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.id || index}
            className="venue-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="venue-image" style={{ backgroundImage: `url(${venue.image})` }}>
              {venueType === "popular" && (
                <div className="venue-explore-overlay">
                  <span>Explore</span>
                </div>
              )}
            </div>
            <div className="venue-label-below">{venue.name}</div>
          </motion.div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-arrow"
          onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index + 1}
            className={`page-dot ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => onPageChange && onPageChange(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button
          className="pagination-arrow"
          onClick={() => onPageChange && onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </motion.section>
  );
};

export default VenueGrid;

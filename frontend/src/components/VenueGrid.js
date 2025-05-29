"use client";

import { motion } from "framer-motion";
import "../styles/VenueGrid.css";

const VenueGrid = ({
  title,
  viewAllText,
  venues = [1, 2, 3, 4],
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

  const getVenueImageClass = (index) => {
    if (venueType === "popular") {
      return `venue-image popular-venue-${index}`;
    }
    return `venue-image category-venue-${index}`;
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
        {venues.map((item, index) => (
          <motion.div
            key={item}
            className="venue-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className={getVenueImageClass(index + 1)}>
              <div className="venue-overlay">
                <span className="venue-label">Venue</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index + 1}
            className={`page-dot ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => onPageChange && onPageChange(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </motion.section>
  );
};

export default VenueGrid;

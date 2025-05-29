"use client";

import { motion } from "framer-motion";
import "../styles/ReviewsSection.css";

const ReviewsSection = () => {
  return (
    <motion.section
      className="reviews-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2>Reviews</h2>
      <div className="pagination">
        <span className="page-dot active">1</span>
        <span className="page-dot">2</span>
        <span className="page-dot">3</span>
      </div>
    </motion.section>
  );
};

export default ReviewsSection;

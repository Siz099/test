"use client";

import { motion } from "framer-motion";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-background">
        <motion.h1
          className="hero-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Your Venue, Your Way
        </motion.h1>
        <motion.div
          className="search-container"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <select className="search-select">
            <option>Select Category</option>
            <option>Wedding Venues</option>
            <option>Corporate Events</option>
            <option>Party Venues</option>
            <option>Birthday Parties</option>
            <option>Anniversary Celebrations</option>
          </select>
          <select className="search-select">
            <option>Select Location</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
            <option>Miami</option>
            <option>Las Vegas</option>
          </select>
          <button className="search-btn">Search</button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;

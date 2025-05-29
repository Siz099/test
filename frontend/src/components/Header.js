"use client";

import { motion } from "framer-motion";
import "../styles/Header.css";

const Header = () => {
  return (
    <motion.header
      className="header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav">
        <ul className="nav-links">
          <li>
            <a href="#home" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#venue">Venue</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#media">Media</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
        <div className="nav-actions">
          <button className="search-icon">🔍</button>
          <button className="signin-btn">Sign In</button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;

"use client";

import { motion } from "framer-motion";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-content">
        <div className="footer-column">
          <h4>Company Logo</h4>
          <div className="social-media">
            <span className="social-icon facebook">f</span>
            <span className="social-icon twitter">t</span>
            <span className="social-icon instagram">📷</span>
          </div>
        </div>
        <div className="footer-column">
          <h4>Venues</h4>
          <ul>
            <li>Ahmedabad</li>
            <li>Surat</li>
            <li>Rajkot</li>
            <li>Dubai</li>
            <li>Pune</li>
            <li>Gandhinagar</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Suppliers</h4>
          <ul>
            <li>Photographers</li>
            <li>Decorators</li>
            <li>Caterers</li>
            <li>Choreographers</li>
            <li>Designers</li>
            <li>Entertainment</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Newsletter</h4>
          <p>Subscribe to Get Latest Media Updates</p>
          <button className="live-chat">Live Chat</button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Made with love by <span className="highlight">Namastey Digital</span>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

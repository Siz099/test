"use client";

import "../styles/Header.css";

export default function Header() {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/placeholder.svg?height=45&width=45" alt="Coordina Logo" className="logo-icon" />
        </div>

        <div className="navbar-center">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Venue
          </a>
          <a href="#" className="nav-link">
            About
          </a>
          <a href="#" className="nav-link">
            Media
          </a>
          <a href="#" className="nav-link">
            Contact Us
          </a>
        </div>

        <div className="navbar-right">
          <button className="search-icon">
            <i className="fas fa-search"></i>
          </button>
          <button className="sign-in-button">Sign In</button>
        </div>
      </nav>
    </>
  )
}

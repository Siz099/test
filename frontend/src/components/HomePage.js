"use client";

import Navbar from "./Header";
import HeroSection from ".//HeroSection";
import BrowseByCategory from ".//BrowseByCategory";
import PopularVenues from ".//PopularVenues";
import ReviewsSection from ".//ReviewsSection";
// import Newsletter from ".//Newsletter";
import Footer from ".//Footer";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <HeroSection />
      <BrowseByCategory />
      <PopularVenues />
      <ReviewsSection />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
};

export default HomePage;

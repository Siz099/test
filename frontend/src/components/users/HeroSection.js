
import "../../styles/HeroSection.css";

const HeroSection = () => {
    return (
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Your Venue, Your Way</h1>
          <div className="hero-search">
            <select className="hero-dropdown">
              <option>Select Category</option>
              <option>Wedding Venues</option>
              <option>Corporate Events</option>
              <option>Birthday Parties</option>
              <option>Conferences</option>
            </select>
            <select className="hero-dropdown">
              <option>Select Location</option>
              <option>Kathmandu</option>
              <option>Pokhara</option>
              <option>Chitwan</option>
              <option>Lalitpur</option>
            </select>
            <button className="hero-search-button">Search</button>
          </div>
        </div>
      </section>
    )
};

export default HeroSection;

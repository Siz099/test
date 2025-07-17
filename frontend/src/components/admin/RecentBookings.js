import React from 'react';
import '../../styles/admin/RecentBookings.css';

const bookings = [
  {
    venue: 'Grand Ballroom',
    customer: 'Rajesh sharma',
    partner: 'Royal Events',
    date: 'May 25, 2025',
    price: 'NPR 30,000',
  },
  {
    venue: 'Grand Ballroom',
    customer: 'Rajesh sharma',
    partner: 'Royal Events',
    date: 'May 25, 2025',
    price: 'NPR 30,000',
  },
];

const RecentBookings = () => {
  return (
    <div className="recent-bookings-container">
      <div className="recent-bookings-header">
        <div>
          <h2 className="recent-bookings-title">Recent Bookings</h2>
          <p className="recent-bookings-subtitle">Latest Bookings</p>
        </div>
      </div>
      <div className="recent-bookings-list">
        {bookings.map((booking, index) => (
          <div className="booking-card" key={index}>
            <div className="booking-info">
              <h3 className="booking-venue">{booking.venue}</h3>
              <p className="booking-customer">Customer: {booking.customer}</p>
              <p className="booking-partner">Partner: {booking.partner}</p>
              <p className="booking-date">Date: {booking.date}</p>
            </div>
            <div className="booking-price-details">
              <p className="booking-price">{booking.price}</p>
              <button className="view-details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
      <div className="view-all-bookings-container">
        <button className="view-all-bookings-button">View all Recent Bookings</button>
      </div>
    </div>
  );
};

export default RecentBookings;
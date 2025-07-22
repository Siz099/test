import React, { useState, useEffect } from 'react';
import '../../styles/admin/PartnerManagement.css';
import { venueService, imageService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const VenueManagement = () => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    const [menuOpenId, setMenuOpenId] = useState(null);
     const [images, setImages] = useState({});

  useEffect(() => {
      const fetchVenues = async () => {
    setLoading(true);
   try {
        const response = await venueService.listVenue();

        // Map venues and set initial state
        const mappedVenues = response.map(v => ({
          venue_id: v.venue_id,
          venueName: v.venueName || v.venue_name,
          location: v.location,
          capacity: v.capacity,
          price: v.price,
       
        }));

        setVenues(mappedVenues);

        // Fetch images one by one (or in parallel)
        const imagePromises = mappedVenues.map(async (venue) => {
          try {
            const imageBlob = await imageService.getImage(venue.venue_id);
            return {
              venue_id: venue.venue_id,
              imageUrl: URL.createObjectURL(imageBlob),
            };
          } catch {
            return {
              venue_id: venue.venue_id,
              imageUrl: null, 
            };
          }
        });

        const imagesArray = await Promise.all(imagePromises);

        // Convert to an object for easy access
        const imagesMap = {};
        imagesArray.forEach(({ venue_id, imageUrl }) => {
          imagesMap[venue_id] = imageUrl;
        });

        setImages(imagesMap);

      } catch (err) {
        console.error(err);
        setError('Failed to fetch venues or images.');
        setVenues([]);
        setImages({});
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = venues.filter(venue => {
    const term = searchTerm.toLowerCase();
    return (
      (venue.venueName || '').toLowerCase().includes(term) ||
      (venue.location || '').toLowerCase().includes(term)
    );
  });

 const handleAdd = (id) => {
     navigate('/partner/venues/new');
    setMenuOpenId(null); 
  };
 const handleEditVenue = (venue) => {
  if (!venue?.venue_id) {
    console.error("Invalid venue ID:", venue?.venue_id);
    return;
  }
  console.log("Navigating to edit Venue with ID:", venue.venue_id);
  navigate(`/partner/venues/edit/${venue.venue_id}`);
};

 const handleViewVenue = (venue) => {
  if (!venue?.venue_id) {
    console.error("Invalid venue ID:", venue?.venue_id);
    return;
  }
  console.log("Navigating to edit Venue with ID:", venue.venue_id);
  navigate(`/partner/venues/${venue.venue_id}`);
};



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="partner-management">
      <div className="header">
        <div>
          <h1>Venue Management</h1>
          <p>Manage your venues</p>
        </div>
        <button onClick={handleAdd} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Add New Venue</button>
      </div>
      <div className="user-list-container">
        <div className="user-list-header">
          <h2>All Venues</h2>
          <p>A list of all your venues</p>
        </div>
        <div className="search-bar-container">
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search venue by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="partner-table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Venue Image</th>
                <th>Venue Name</th>
  
                <th>Location</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
           <tbody>
  {filteredVenues.map((venue) => (
    <tr key={venue.venue_id}>
      <td>{venue.venue_id}</td>
      <td>
         {images[venue.venue_id] ? (
            <img
              src={images[venue.venue_id]}
              alt={venue.venueName}
              style={{ width: 200, height: 'auto' }}
            />
          ) : (
            <div>No image available</div>
          )}
      </td>
      <td>{venue.venueName}</td>
      <td>{venue.location}</td>
      <td>{venue.capacity}</td>
      <td>{venue.price}</td>
      <td className="action-cell">
        <button className="action-btn" onClick={() => handleViewVenue(venue)}>View</button>
        <button className="action-btn" onClick={() => handleEditVenue(venue)}>Edit</button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VenueManagement; 
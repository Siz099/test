package com.event.dto;

import com.event.model.Venue;

public class VenueDTO {

	
	 private Long venue_id;
	    private String venueName;
	    private String location;
	    private String capacity;
	    private String price;
	    private String bookings;
	    private String status;
	    private String partnerName;
	    private Long partnerId;
	    private String imageUrl;
	    
	    
	    public VenueDTO(Long venue_id, String venueName, String location,
                String capacity, String price, String bookings,
                String status, String partnerName, String imageUrl) {
    this.venue_id = venue_id;
    this.venueName = venueName;
    this.location = location;
    this.capacity = capacity;
    this.price = price;
    this.bookings = bookings;
    this.status = status;
    this.partnerName = partnerName;
    this.imageUrl = imageUrl;
}

public static VenueDTO fromVenue(Venue v) {
    return new VenueDTO(
        v.getVenue_id(),
        v.getVenueName(),
        v.getLocation(),
        String.valueOf(v.getCapacity()),
        String.valueOf(v.getPrice()),
        String.valueOf(v.getBookings()),
        v.getStatus(),
        String.valueOf(v.getImageUrl()),
        v.getPartner() != null ? v.getPartner().getFullname() : "Unknown"
        
    );
}

	    
	    
		public Long getPartnerId() {
	return partnerId;
}

public void setPartnerId(Long partnerId) {
	this.partnerId = partnerId;
}

		public Long getVenue_id() {
			return venue_id;
		}
		public void setVenue_id(Long venue_id) {
			this.venue_id = venue_id;
		}
		public String getVenueName() {
			return venueName;
		}
		public void setVenueName(String venueName) {
			this.venueName = venueName;
		}
		public String getLocation() {
			return location;
		}
		public void setLocation(String location) {
			this.location = location;
		}
		public String getCapacity() {
			return capacity;
		}
		public void setCapacity(String capacity) {
			this.capacity = capacity;
		}
		public String getPrice() {
			return price;
		}
		public void setPrice(String price) {
			this.price = price;
		}
		public String getBookings() {
			return bookings;
		}
		public void setBookings(String bookings) {
			this.bookings = bookings;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}



		public String getPartnerName() {
			return partnerName;
		}



		public void setPartnerName(String partnerName) {
			this.partnerName = partnerName;
		}

		public String getImageUrl() {
			return imageUrl;
		}

		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}
		
		
	    
	}

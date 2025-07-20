package com.event.dto;

import java.time.LocalDateTime;

public class BookingDTO {

	 private Long venueId;
	    private String status;
	    private LocalDateTime bookedTime;
	    
		public Long getVenueId() {
			return venueId;
		}
		public void setVenueId(Long venueId) {
			this.venueId = venueId;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public LocalDateTime getBookedTime() {
			return bookedTime;
		}
		public void setBookedTime(LocalDateTime bookedTime) {
			this.bookedTime = bookedTime;
		}

	    
}
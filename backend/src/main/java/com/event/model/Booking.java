package com.event.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Booking {

	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long booking_Id;

	    private String status;
	    
	    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	    private LocalDateTime bookedTime;

	    @ManyToOne
	    @JoinColumn(name = "venue_id", nullable = false)
	    private Venue venue;





		public Long getBooking_Id() {
			return booking_Id;
		}

		public void setBooking_Id(Long booking_Id) {
			this.booking_Id = booking_Id;
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

		public Venue getVenue() {
			return venue;
		}

		public void setVenue(Venue venue) {
			this.venue = venue;
		}
	    
	    

	  
}

package com.event.controller.Admin;

import org.springframework.web.bind.annotation.*;

import com.event.dto.BookingDTO;
import com.event.model.Booking;
import com.event.model.Venue;
import com.event.repository.BookingRepo;
import com.event.repository.VenueRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.*;

//@RequestMapping("/admin/bookings")
//@RestController
//public class BookingController {
//	
//	
//	@Autowired
//	private BookingRepo bookingRepo;
//	    
//
//	@Autowired
//	private VenueRepo venueRepo;
//	  
//	    @GetMapping
//	    public List<Booking> listBooking() {
//	        return  bookingRepo.findAll();
//	    }
//	    
//	    @PostMapping("/new")
//	    public ResponseEntity<Booking> saveBooking(@RequestBody BookingDTO dto) {
//	        Venue venue = venueRepo.findById(dto.getVenueId())
//	                .orElseThrow();
//
//	        Booking booking = new Booking();
//	        booking.setVenue(venue);
//	        booking.setStatus(dto.getStatus());
//	        booking.setBookedTime(dto.getBookedTime());
//
//	        Booking savedBooking = bookingRepo.save(booking);
//	        return ResponseEntity.ok(savedBooking);
//	    }
//	 
//	    
//}
	


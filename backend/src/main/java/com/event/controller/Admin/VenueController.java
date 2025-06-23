package com.event.controller.Admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.event.model.Venue;
import com.event.repository.VenueRepo;

import org.springframework.ui.Model;

@RequestMapping("/admin/venues")
@RestController
public class VenueController {
	
	
	@Autowired
	private VenueRepo venueRepo;

	
	//Venue Controller for Admin
	
	    // List all venues
	    @GetMapping
	    public List<Venue> listVenues() {
	        return venueRepo.findAll();
	    }

	    @PostMapping("/new")  
	    public Venue saveVenue(@RequestBody Venue venue) {
	      return venueRepo.save(venue);
	    }

	    // edit the data in venue
	    @GetMapping("/edit/{id}")
	    public String editVenue(@PathVariable Long id, Model m) {
	        venueRepo.findById(id)
	            .ifPresent(v -> m.addAttribute("venue", v));
	        return "admin/venueForm";
	    }

	    @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
	      venueRepo.deleteById(id);
	      return ResponseEntity.noContent().build();
	    }
	    
	 
	}
	


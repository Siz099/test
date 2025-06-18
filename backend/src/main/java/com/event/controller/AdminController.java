package com.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.event.model.Venue;
import com.event.repository.VenueRepo;
import org.springframework.ui.Model;

import jakarta.servlet.http.HttpSession;

@RequestMapping("/admin/venues")
@RestController
public class AdminController {
	
	
	@Autowired
	private VenueRepo venueRepo;

	
	//Venue Controller
	
	    // List all venues
	    @GetMapping
	    public String listVenues(Model m, HttpSession s) {
	        if (s.getAttribute("activeUser") == null) return "redirect:/login";
	        m.addAttribute("vList", venueRepo.findAll());
	        return "admin/venueList";
	    }

	    @PostMapping("/new")  // FIX: add this method to handle POST
	    public Venue saveVenue(@RequestBody Venue venue) {
	      return venueRepo.save(venue);
	    }

	    // Optional: GET mapping remains if you use server-rendered views
	    @GetMapping("/new")
	    public String newVenue(Model m) {
	      m.addAttribute("venue", new Venue());
	      return "admin/venueAddTest";  // view name
	    }
	  
	    // Edit form
	    @GetMapping("/edit/{id}")
	    public String editVenue(@PathVariable Long id, Model m) {
	        venueRepo.findById(id)
	            .ifPresent(v -> m.addAttribute("venue", v));
	        return "admin/venueForm";
	    }

	    // Delete venue
	    @GetMapping("/delete/{id}")
	    public String deleteVenue(@PathVariable Long id) {
	        venueRepo.deleteById(id);
	        return "redirect:/admin/venues";
	    }
	}
	


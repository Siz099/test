package com.event.controller.Admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.event.dto.VenueDTO;
import com.event.model.Partner;
import com.event.model.Venue;
import com.event.repository.PartnerRepo;
import com.event.repository.UserRepo;
import com.event.repository.VenueRepo;

import org.springframework.ui.Model;

@RequestMapping("/venues")
@RestController
public class VenueController {
	
	
	@Autowired
	private VenueRepo venueRepo;
	
	@Autowired
	private PartnerRepo partnerRepo;
	
	
	@Autowired
	private UserRepo userRepo;
	
	@GetMapping
	public List<VenueDTO> getVenues(Authentication authentication) {
	    if (authentication != null && authentication.isAuthenticated()) {
	        String email = authentication.getName();
	        boolean isPartner = authentication.getAuthorities().stream()
	            .anyMatch(auth -> auth.getAuthority().equals("ROLE_PARTNER"));

	        if (isPartner) {
	            Partner partner = partnerRepo.findByEmail(email)
	                .orElseThrow(() -> new RuntimeException("Partner not found"));
	            return venueRepo.findByPartner(partner).stream()
	                .map(v -> new VenueDTO(
	                    v.getVenue_id(),
	                    v.getVenueName(),
	                    v.getLocation(),
	                    v.getCapacity(),
	                    v.getPrice(),
	                    v.getBookings(),
	                    v.getStatus(),
	                    v.getImageUrl(),
	                    partner.getFullname()
	                ))
	                .collect(Collectors.toList());
	        }
	    }

	    // For anonymous or non-partner users
	    return venueRepo.findAll().stream()
	        .map(v -> new VenueDTO(
	            v.getVenue_id(),
	            v.getVenueName(),
	            v.getLocation(),
	            v.getCapacity(),
	            v.getPrice(),
	            v.getBookings(),
	            v.getStatus(),
	            v.getImageUrl(),
	            v.getPartner() != null ? v.getPartner().getFullname() : "Unknown"
	        ))
	        .collect(Collectors.toList());
	}
	
	
	
	    @PostMapping("/new")
	    public Venue saveVenue(@RequestBody Venue venue, Authentication authentication) {
	        String email = authentication.getName();
	        Partner partner = partnerRepo.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("Partner not found"));

	       
	        venue.setPartner(partner); 

	 
	        partner.getVenues().add(venue);

	        return venueRepo.save(venue);
	    }
	    
	 
	    @PostMapping("/add")
	    @PreAuthorize("hasRole('ADMIN')")
	    public Venue addVenueByAdmin(@RequestBody VenueDTO request) {
	        Partner partner = partnerRepo.findById(request.getPartnerId())
	            .orElseThrow(() -> new RuntimeException("Partner not found"));

	        Venue venue = new Venue();
	        venue.setVenueName(request.getVenueName());
	        venue.setLocation(request.getLocation());
	        venue.setPrice(request.getPrice());
	        venue.setCapacity(request.getCapacity());
	        venue.setPartner(partner);
	        venue.setImageUrl(request.getImageUrl());

	        partner.getVenues().add(venue);

	        return venueRepo.save(venue);
	    }
	    

	    @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
	      venueRepo.deleteById(id);
	      return ResponseEntity.noContent().build();
	    }
	    
	    @GetMapping("/{id}")
	    public ResponseEntity<VenueDTO> getVenue(@PathVariable Long id) {
	        return venueRepo.findById(id)
	            .map(venue -> {
	                VenueDTO dto = new VenueDTO(
	                    venue.getVenue_id(),
	                    venue.getVenueName(),
	                    venue.getLocation(),
	                    venue.getCapacity(),
	                    venue.getPrice(),
	                    venue.getBookings(),
	                    venue.getStatus(),
	                    venue.getImageUrl(),
	                    venue.getPartner() != null ? venue.getPartner().getFullname() : "Unknown"
	                );
	                return ResponseEntity.ok(dto);
	            })
	            .orElse(ResponseEntity.notFound().build());
	    }

	    @PutMapping("/edit/{id}")
	    public ResponseEntity<VenueDTO> updateVenue(
	        @PathVariable Long id,
	        @RequestBody VenueDTO payload
	    ) {
	        return venueRepo.findById(id)
	            .map(existing -> {
	                existing.setVenueName(payload.getVenueName());
	                existing.setLocation(payload.getLocation());
	                existing.setCapacity(payload.getCapacity());
	                existing.setPrice(payload.getPrice());
	                existing.setBookings(payload.getBookings());
	                existing.setStatus(payload.getStatus());

	                Venue saved = venueRepo.save(existing);

	                VenueDTO dto = new VenueDTO(
	                    saved.getVenue_id(),
	                    saved.getVenueName(),
	                    saved.getLocation(),
	                    saved.getCapacity(),
	                    saved.getPrice(),
	                    saved.getBookings(),
	                    saved.getStatus(),
	                    saved.getImageUrl(),
	                    saved.getPartner() != null ? saved.getPartner().getFullname() : "Unknown"
	                );

	                return ResponseEntity.ok(dto);
	            })
	            .orElse(ResponseEntity.notFound().build());
	    }


	    
}

	    
	 
	
	


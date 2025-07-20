package com.event.controller.Admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.event.repository.VenueRepo;

import org.springframework.ui.Model;

@RequestMapping("/venues")
@RestController
public class VenueController {
	
	
	@Autowired
	private VenueRepo venueRepo;
	
	@Autowired
	private PartnerRepo partnerRepo;

	
	
	@GetMapping
	public List<VenueDTO> getPartnerVenues(Authentication authentication) {
	    // Get the logged-in partner's email (if email is the principal)
	    String email = authentication.getName();

	    // Use the email to find the Partner
	    Partner partner = partnerRepo.findByEmail(email)
	        .orElseThrow(() -> new RuntimeException("Partner not found"));

	    // Find venues belonging to this partner
	    List<Venue> venues = venueRepo.findByPartner(partner);

	    return venues.stream()
	        .map(v -> new VenueDTO(
	            v.getVenue_id(),
	            v.getVenueName(),
	            v.getLocation(),
	            v.getCapacity(),
	            v.getPrice(),
	            v.getBookings(),
	            v.getStatus(),
	            partner.getFullname()
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
	                    saved.getPartner() != null ? saved.getPartner().getFullname() : "Unknown"
	                );

	                return ResponseEntity.ok(dto);
	            })
	            .orElse(ResponseEntity.notFound().build());
	    }


	    
}

	    
	 
	
	


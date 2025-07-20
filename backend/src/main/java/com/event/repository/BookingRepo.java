package com.event.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.event.model.Booking;
import com.event.model.Partner;




@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
	
	long countByVenue_Partner(Partner partner);
		
		Optional<Booking> findById(Long id);

	}


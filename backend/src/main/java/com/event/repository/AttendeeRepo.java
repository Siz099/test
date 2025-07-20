package com.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.event.model.Attendee;
import com.event.model.Partner;
import com.event.model.User;


@Repository
public interface AttendeeRepo extends JpaRepository<Attendee, Long> {

	Attendee findByEmail(String email);
	
	
	

}


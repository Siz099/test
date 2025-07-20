package com.event.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.event.model.Admin;
import com.event.repository.UserRepo;


@Configuration
public class AdminMaker {
	@Bean
	public CommandLineRunner createDefaultAdmin(UserRepo uRepo, PasswordEncoder passwordEncoder) {
	    return args -> {
	        String adminEmail = "admin@gmail.com";
	        String adminPassword = "admin123";
	  

	        if (uRepo.findByEmail(adminEmail) == null) {
	        	Admin admin = new Admin();
	            admin.setEmail(adminEmail);
	            admin.setPassword(passwordEncoder.encode(adminPassword)); 
	            admin.setFullname("admin");
	            admin.setRole("admin");

	            uRepo.save(admin);
	            System.out.println("Default admin user created.");
	        } else {
	            System.out.println("Admin user already exists.");
	        }
	    };
	}
}

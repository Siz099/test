package com.event.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.event.model.User;
import com.event.repository.UserRepo;


@Configuration
public class AdminMaker {
	@Bean
	public CommandLineRunner createDefaultAdmin(UserRepo uRepo, PasswordEncoder passwordEncoder) {
	    return args -> {
	        String adminEmail = "admin@example.com";
	        String adminPassword = "Admin@123";
	  

	        if (uRepo.findByEmail(adminEmail) == null) {
	            User admin = new User();
	            admin.setEmail(adminEmail);
	            admin.setPassword(passwordEncoder.encode(adminPassword)); 
	            admin.setRole("admin");

	            uRepo.save(admin);
	            System.out.println("Default admin user created.");
	        } else {
	            System.out.println("Admin user already exists.");
	        }
	    };
	}
}

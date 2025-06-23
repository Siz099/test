package com.event.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.event.repository.UserRepo;
import com.event.configuration.JwtUtil;
import com.event.model.User;


@RestController
@RequestMapping("/auth") 
public class SignupController {
	
	@Autowired
	private UserRepo uRepo;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	 @Autowired
	 private BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping("signup")
	public ResponseEntity<?> register(@RequestBody @Validated User user) {
	    try {
	        String plainPassword = user.getPassword();
	        String hashedPassword = passwordEncoder.encode(plainPassword);
	        user.setPassword(hashedPassword);

	        if (uRepo.findByEmail(user.getEmail()) != null) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
	        }
	        else {
	        	uRepo.save(user);
	        }  
	       
	        return ResponseEntity.ok("User registered successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
	    }
	}
	
	
	@PostMapping("partner-signup")
	public ResponseEntity<?> registerPartner(@RequestBody @Validated User user) {
	    try {
	        String plainPassword = user.getPassword();
	        String hashedPassword = passwordEncoder.encode(plainPassword);
	        user.setPassword(hashedPassword);

	        if (uRepo.findByEmail(user.getEmail()) != null) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
	        }
	        else {
	        	uRepo.save(user);
	        }  
	       
	        return ResponseEntity.ok("User registered successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
	    }
	}
	
	
	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody @Validated User user) {
	    try {
	        User existingUser = uRepo.findByEmail(user.getEmail());

	        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
	            String role = existingUser.getRole();
	            String token = jwtUtil.generateToken(existingUser.getEmail(), role);

	            String redirectUrl;	
	            switch (role.toLowerCase()) {
	                case "admin":
	                    redirectUrl = "/admin/dashboard";
	                    break;
	                case "user":
	                    redirectUrl = "/user/home";
	                    break;
	                case "client":
	                    redirectUrl = "/client/home";
	                    break;
	                default:
	                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unknown role");
	            }

	            return ResponseEntity.ok(Map.of(
	                "message", "Login successful",
	                "token", token,
	                "role", role,
	                "redirect", redirectUrl
	            ));
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
	    }
	}
	

	
	
	
	
	
	
}

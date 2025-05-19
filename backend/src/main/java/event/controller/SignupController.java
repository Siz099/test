package event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import event.model.User;
import event.repository.UserRepo;


@RestController
public class SignupController {
	
	@Autowired
	private UserRepo uRepo;
	
	 @Autowired
	 private BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody @Validated User user) {
	    try {
	        String plainPassword = user.getPassword();
	        String hashedPassword = passwordEncoder.encode(plainPassword);
	        user.setPassword(hashedPassword);

	        uRepo.save(user);
	        return ResponseEntity.ok("User registered successfully");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
	    }
	}
	
	
}

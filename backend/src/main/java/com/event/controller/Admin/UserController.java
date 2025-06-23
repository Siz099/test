package com.event.controller.Admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.event.model.User;
import com.event.repository.UserRepo;
import org.springframework.ui.Model;

@RequestMapping("/admin/users")
@RestController
public class UserController {
	
	

	@Autowired
	private UserRepo userRepo;
	    
	    
	  //User Controller for Admin
	    @GetMapping
	    public List<User> listUser() {
	        return userRepo.findAll();
	    }
	    
	    @PostMapping("/new")  
	    public User saveUser(@RequestBody User user) {
	      return userRepo.save(user);
	    }
	    
	    // edit the data in user
	    @GetMapping("/edit/{id}")
	    public String editUser(@PathVariable Long id, Model m) {
	        userRepo.findById(id)
	            .ifPresent(u -> m.addAttribute("user", u));
	        return "admin/venueForm";
	    }

	    
	    @DeleteMapping("/delete/{userId}")
	    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
	        if (userRepo.existsById(userId)) {
	            userRepo.deleteById(userId);
	            return ResponseEntity.noContent().build();
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
	


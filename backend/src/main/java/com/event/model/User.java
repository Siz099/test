package com.event.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

	@Entity
	public class User {

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long user_id;
	    private String password;
	    private String phoneNumber;
	    private String fullname;
	    private String Company;
	    private String Role;
	    
	    @Column(unique = true, nullable = false)
	    private String email;
	     
	    
		public Long getUser_id() {
			return user_id;
		}
		public void setUser_id(Long user_id) {
			this.user_id = user_id;
		}
		
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPhoneNumber() {
			return phoneNumber;
		}
		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}
		public String getFullname() {
			return fullname;
		}
		public void setFullname(String fullname) {
			this.fullname = fullname;
		}
		public String getCompany() {
			return Company;
		}
		public void setCompany(String company) {
			Company = company;
		}
		public String getRole() {
			return Role;
		}
		public void setRole(String role) {
			Role = role;
		}
	  
		
		
		
	
	    
	    
	}


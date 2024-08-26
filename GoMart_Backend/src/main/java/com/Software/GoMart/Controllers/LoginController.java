package com.Software.GoMart.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Software.GoMart.Entites.UserMaster;
import com.Software.GoMart.Services.UserService;

@RestController
@RequestMapping("/GoMart/users")
@CrossOrigin(origins ="http://localhost:5173")
public class LoginController {
	
	@Autowired
	UserService userService;
	
	@GetMapping
	public List<UserMaster> getAllUsers(){
		return userService.getAllUsers();
	}
	@PostMapping("/loggedin")
	public ResponseEntity<String> loginUser(@RequestBody UserMaster user){
		UserMaster user1 = userService.authenticateUser(user.getUsername(), user.getPassword());
			if(user1 != null && user1.getPassword().equals(user.getPassword())) {
				System.err.println("===== LOGIN SECCESSFULLY =====");
				return ResponseEntity.ok("Login Seccessfully");
			}
			else {
				System.err.println("===== INVALID PASSWORD OR USERNAME =====");
				return ResponseEntity.ok("Invalid Password or Username ");
			}
		}
		
	}




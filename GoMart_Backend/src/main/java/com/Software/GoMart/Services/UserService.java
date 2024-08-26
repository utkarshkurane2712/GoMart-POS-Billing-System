package com.Software.GoMart.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Software.GoMart.Entites.UserMaster;
import com.Software.GoMart.Repositiory.UserRepositiory;

@Service
public class UserService {

	@Autowired
	private UserRepositiory userRepo;
	
	public  UserMaster authenticateUser(String username,String password) {
		UserMaster user =  userRepo.findByUsername(username);
		if(user != null && user.getUsername().equals(username)) {
			return user;
		}
		return null;
	}
	
	public List<UserMaster> getAllUsers(){
		return userRepo.findAll();
	}

}

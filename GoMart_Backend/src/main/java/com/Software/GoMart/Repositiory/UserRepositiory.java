package com.Software.GoMart.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Software.GoMart.Entites.UserMaster;


@Repository
public interface UserRepositiory extends JpaRepository<UserMaster, Integer> {
	
	UserMaster findByUsername(String username);

}

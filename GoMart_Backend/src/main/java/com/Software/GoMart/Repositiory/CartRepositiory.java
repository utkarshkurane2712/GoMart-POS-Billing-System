package com.Software.GoMart.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import com.Software.GoMart.Entites.CartMaster;

@Repository
public interface CartRepositiory extends JpaRepository<CartMaster, Integer> {

}

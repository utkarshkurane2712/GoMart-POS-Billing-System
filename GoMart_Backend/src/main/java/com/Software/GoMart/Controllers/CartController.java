package com.Software.GoMart.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Software.GoMart.Entites.CartMaster;
import com.Software.GoMart.Services.BillService;
import com.Software.GoMart.Services.CartService;

@RestController
@RequestMapping("/GoMart/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@Autowired
	private BillService billService;
	
	@PostMapping("addToCart")
	public ResponseEntity<CartMaster> addCart(@RequestBody CartMaster cart){
		CartMaster newCart = cartService.addtoCart(cart);
		
		//  Save receipt after cart is successfully saved
		billService.saveBill(newCart);
		System.err.println("===== BILL PRINTED SUCCESSFULLY =====");
		return ResponseEntity.status(HttpStatus.CREATED).body(newCart);
		
	}

}          

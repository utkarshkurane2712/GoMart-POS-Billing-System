package com.Software.GoMart.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Software.GoMart.Entites.CustomerMaster;
import com.Software.GoMart.Services.CustomerService;

@RestController
@RequestMapping("/GoMart/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	
	@PostMapping("/addCustomer")
	public ResponseEntity<CustomerMaster> addCustomer(@RequestBody CustomerMaster customer ){
		 CustomerMaster newCustomer = customerService.addCustomer(customer);
		 System.err.println("===== NEW CUSTOMER ADDED SUCCESSFULLY ===== ");
	     return ResponseEntity.status(HttpStatus.CREATED).body(newCustomer);
		
	}

}

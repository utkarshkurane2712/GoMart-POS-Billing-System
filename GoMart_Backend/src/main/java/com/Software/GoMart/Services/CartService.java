package com.Software.GoMart.Services;


import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Software.GoMart.Entites.CartMaster;
import com.Software.GoMart.Entites.CustomerMaster;
import com.Software.GoMart.Entites.ProductMaster;
import com.Software.GoMart.Repositiory.CartRepositiory;
import com.Software.GoMart.Repositiory.CustomerRepositiory;
import com.Software.GoMart.Repositiory.ProductRepositiroy;



@Service
public class CartService {
	
	@Autowired
	private CartRepositiory cartRepo;
	
	@Autowired
	private ProductRepositiroy productRepo;
	
	@Autowired
	private CustomerRepositiory customerRepo;
	
	public CartMaster addtoCart(CartMaster cart) {
		// fetch and set the products from database
		System.out.println("carts :" +cart.getProducts());
		Set<ProductMaster> products = cart.getProducts();
		System.out.println("Products" +products);
		
		products = products.stream().map(product -> productRepo.findById(product.getProductid()).orElseThrow(() -> new RuntimeException("Product Not Found"))).collect(Collectors.toSet());
		cart.setProducts(products);
		cart.setCreatedon(LocalDate.now());
		
		// fetch and set the customer from database
		CustomerMaster customer = customerRepo.findById(cart.getCustomer().getCustomer_id()).orElseThrow(() -> new RuntimeException("Customer not found"));
		cart.setCustomer(customer);
		
		return cartRepo.save(cart);
	}

	
	public List<CartMaster> getAllCarts(){
		return cartRepo.findAll();
	}
	
	public CartMaster getByCartId(int cartid) {
		return cartRepo.findById(cartid).orElseThrow(() -> new RuntimeException("Cart Not Found"));
	}
}

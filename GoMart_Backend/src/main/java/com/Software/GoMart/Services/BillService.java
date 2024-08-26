package com.Software.GoMart.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Software.GoMart.Entites.BillMaster;
import com.Software.GoMart.Entites.CartMaster;
import com.Software.GoMart.Entites.ProductMaster;
import com.Software.GoMart.Repositiory.BillRepositiory;

@Service
public class BillService {

	@Autowired
	private BillRepositiory billRepo;
	
	public BillMaster saveBill(CartMaster cart) {
		BillMaster bill = new BillMaster();
		
		//Set customer details
		bill.setCustomer(cart.getCustomer());
		
		//Populate product names
		String AllProducts =cart.getProducts().stream().map(ProductMaster :: getProductname).collect(Collectors.joining(", "));
		bill.setProductName(AllProducts);
		
		//Populate other receipt details from cart
		bill.setQty(cart.getQty());
		bill.setNetBill(cart.getNet_bill());
		bill.setCreatedon(cart.getCreatedon());
		
		return billRepo.save(bill);
	}
	
	
	 public BillMaster getReceiptById(int id) {
	        return billRepo.findById(id)
	                .orElseThrow(() -> new RuntimeException("Receipt not found"));
	    }

	    public List<BillMaster> getAllReceipts() {
	        return billRepo.findAll();
	    }
	
}

package com.Software.GoMart.Entites;

import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name= "billmaster")  
public class BillMaster {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="bill_id")
    private int billid;

	@Column(name = "product_name")
    private String productName;
   
	@Column(name="PQuantity")
    private int qty;
	
	@Column(name = "net_bill")
	private double netBill;
	
	@Column(name ="created_on")
	private LocalDate createdon;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
	private CustomerMaster customer;

	public BillMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BillMaster(int billid, String productName, int qty, double netBill, LocalDate createdon,
			CustomerMaster customer) {
		super();
		this.billid = billid;
		this.productName = productName;
		this.qty = qty;
		this.netBill = netBill;
		this.createdon = createdon;
		this.customer = customer;
	}

	public int getBillid() {
		return billid;
	}

	public void setBillid(int billid) {
		this.billid = billid;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public double getNetBill() {
		return netBill;
	}

	public void setNetBill(double netBill) {
		this.netBill = netBill;
	}

	public LocalDate getCreatedon() {
		return createdon;
	}

	public void setCreatedon(LocalDate createdon) {
		this.createdon = createdon;
	}

	public CustomerMaster getCustomer() {
		return customer;
	}

	public void setCustomer(CustomerMaster customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "BillMaster [billid=" + billid + ", productName=" + productName + ", qty=" + qty + ", netBill=" + netBill
				+ ", createdon=" + createdon + ", customer=" + customer + "]";
	}

	

	
}

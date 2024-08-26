package com.Software.GoMart.Entites;

import java.time.LocalDate;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="cartmaster")
public class CartMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="cart_id")
	private int cartid;
		
	@Column(name="Total_Quantity")
	private int qty;
	
	@Column(name="sub_total")
	private double sub_total;
	
	@Column(name="discount_percentage")
	private double discount_percentage;
	
	@Column(name="discount_amount")
	private double discount_amount;
	
	@Column(name="net_bill")
	private double net_bill;
	
	@Column(name="payment_mode")
	private String paymentmode;
	
	@Column(name="created_on")
	private LocalDate createdon;

	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
	private CustomerMaster customer;

	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "cart_product", joinColumns = @JoinColumn(name = "cartid"), inverseJoinColumns = @JoinColumn(name = "productid"))
	private Set<ProductMaster> products;

	public CartMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartMaster(int cartid, int qty, double sub_total, double discount_percentage, double discount_amount,
			double net_bill, String paymentmode, LocalDate createdon, int customerid, CustomerMaster customer,
			Set<ProductMaster> products) {
		super();
		this.cartid = cartid;
		this.qty = qty;
		this.sub_total = sub_total;
		this.discount_percentage = discount_percentage;
		this.discount_amount = discount_amount;
		this.net_bill = net_bill;
		this.paymentmode = paymentmode;
		this.createdon = createdon;
		this.customer = customer;
		this.products = products;
	}

	public int getCartid() {
		return cartid;
	}

	public void setCartid(int cartid) {
		this.cartid = cartid;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public double getSub_total() {
		return sub_total;
	}

	public void setSub_total(double sub_total) {
		this.sub_total = sub_total;
	}

	public double getDiscount_percentage() {
		return discount_percentage;
	}

	public void setDiscount_percentage(double discount_percentage) {
		this.discount_percentage = discount_percentage;
	}

	public double getDiscount_amount() {
		return discount_amount;
	}

	public void setDiscount_amount(double discount_amount) {
		this.discount_amount = discount_amount;
	}

	public double getNet_bill() {
		return net_bill;
	}

	public void setNet_bill(double net_bill) {
		this.net_bill = net_bill;
	}

	public String getPaymentmode() {
		return paymentmode;
	}

	public void setPaymentmode(String paymentmode) {
		this.paymentmode = paymentmode;
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

	public Set<ProductMaster> getProducts() {
		return products;
	}

	public void setProducts(Set<ProductMaster> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return "CartMaster [cartid=" + cartid + ", qty=" + qty + ", sub_total=" + sub_total + ", discount_percentage="
				+ discount_percentage + ", discount_amount=" + discount_amount + ", net_bill=" + net_bill
				+ ", paymentmode=" + paymentmode + ", createdon=" + createdon + ", customer=" + customer + ", products="
				+ products + "]";
	}

	
}	
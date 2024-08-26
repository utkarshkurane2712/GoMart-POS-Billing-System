package com.Software.GoMart.Entites;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="customermaster")
public class CustomerMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="customer_id")
	private int customer_id;
	
	@Column(unique = true, name="fullname")
	private String fullname;
	
	@Column(name="mobile")
	private String mobile;
	
	@Column(name="created_on")
	private LocalDate createdon;

	public CustomerMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CustomerMaster(int customer_id, String fullname, String mobile, LocalDate createdon) {
		super();
		this.customer_id = customer_id;
		this.fullname = fullname;
		this.mobile = mobile;
		this.createdon = createdon;
	}

	public int getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public LocalDate getCreatedon() {
		return createdon;
	}

	public void setCreatedon(LocalDate createdon) {
		this.createdon = createdon;
	}

	@Override
	public String toString() {
		return "CustomerMaster [customer_id=" + customer_id + ", fullname=" + fullname + ", mobile=" + mobile
				+ ", createdon=" + createdon + "]";
	}
	
	
	

}

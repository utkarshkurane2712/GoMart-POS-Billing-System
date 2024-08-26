package com.Software.GoMart.Entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="settingmaster")
public class SettingMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int settingid;
	
	@Column(name="business_name")
	private String business_name;
	
	@Column(name="business_mobile")
	private String business_mobile;
	
	@Column(name="business_email")
	private String business_email;
	
	@Column(name="business_address")
	private String business_address;
	
	@Column(name="business_gst_number")
	private String business_gst_number;
	
	@Column(name="business_logo")
	private String business_logo;

	public SettingMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SettingMaster(int settingid, String business_name, String business_mobile, String business_email,
			String business_address, String business_gst_number, String business_logo) {
		super();
		this.settingid = settingid;
		this.business_name = business_name;
		this.business_mobile = business_mobile;
		this.business_email = business_email;
		this.business_address = business_address;
		this.business_gst_number = business_gst_number;
		this.business_logo = business_logo;
	}

	public int getSettingid() {
		return settingid;
	}

	public void setSettingid(int settingid) {
		this.settingid = settingid;
	}

	public String getBusiness_name() {
		return business_name;
	}

	public void setBusiness_name(String business_name) {
		this.business_name = business_name;
	}

	public String getBusiness_mobile() {
		return business_mobile;
	}

	public void setBusiness_mobile(String business_mobile) {
		this.business_mobile = business_mobile;
	}

	public String getBusiness_email() {
		return business_email;
	}

	public void setBusiness_email(String business_email) {
		this.business_email = business_email;
	}

	public String getBusiness_address() {
		return business_address;
	}

	public void setBusiness_address(String business_address) {
		this.business_address = business_address;
	}

	public String getBusiness_gst_number() {
		return business_gst_number;
	}

	public void setBusiness_gst_number(String business_gst_number) {
		this.business_gst_number = business_gst_number;
	}

	public String getBusiness_logo() {
		return business_logo;
	}

	public void setBusiness_logo(String business_logo) {
		this.business_logo = business_logo;
	}

	@Override
	public String toString() {
		return "SettingMaster [settingid=" + settingid + ", business_name=" + business_name + ", business_mobile="
				+ business_mobile + ", business_email=" + business_email + ", business_address=" + business_address
				+ ", business_gst_number=" + business_gst_number + ", business_logo=" + business_logo + "]";
	}
	
	

}

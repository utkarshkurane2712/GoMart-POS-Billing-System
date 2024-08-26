package com.Software.GoMart.Entites;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usermaster")
public class UserMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private int userid;
	
	@Column(unique = true, name="user_name")
	private String username;
	
	@Column(name="password")
	private String password;
	
	@Column(name="created_on")
	private LocalDate createdon;

	public UserMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserMaster(int userid, String username, String password, LocalDate createdon) {
		super();
		this.userid = userid;
		this.username = username;
		this.password = password;
		this.createdon = createdon;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LocalDate getCreatedon() {
		return createdon;
	}

	public void setCreatedon(LocalDate createdon) {
		this.createdon = createdon;
	}

	@Override
	public String toString() {
		return "UserMaster [userid=" + userid + ", username=" + username + ", password=" + password + ", createdon="
				+ createdon + "]";
	}
	
	

}

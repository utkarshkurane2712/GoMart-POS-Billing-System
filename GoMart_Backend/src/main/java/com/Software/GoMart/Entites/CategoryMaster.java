package com.Software.GoMart.Entites;


import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="categorymaster")
public class CategoryMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="category_id")
	private int categoryid;
	
	@Column(unique = true, name="category_name")
	private String categoryname;
	
	@Column(name="category_image")
	private String category_image;
	
	@Column(name="created_on")
	private LocalDate createdon;
	
	@OneToMany(mappedBy = "categoryMaster" ,cascade = CascadeType.ALL ) 
	private List<ProductMaster> products;

	public CategoryMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CategoryMaster(int categoryid, String categoryname, String category_image, LocalDate createdon) {
		super();
		this.categoryid = categoryid;
		this.categoryname = categoryname;
		this.category_image = category_image;
		this.createdon = createdon;
	}

	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryname() {
		return categoryname;
	}

	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}

	public String getCategory_image() {
		return category_image;
	}

	public void setCategory_image(String category_image) {
		this.category_image = category_image;
	}

	public LocalDate getCreatedon() {
		return createdon;
	}

	public void setCreatedon(LocalDate createdon) {
		this.createdon = createdon;
	}

	@Override
	public String toString() {
		return "CategoryMaster [categoryid=" + categoryid + ", categoryname=" + categoryname + ", category_image="
				+ category_image + ", createdon=" + createdon + "]";
	}
	
	

}

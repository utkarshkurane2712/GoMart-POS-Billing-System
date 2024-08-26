package com.Software.GoMart.Controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Software.GoMart.Entites.CategoryMaster;
import com.Software.GoMart.Services.CategoryService;

@RestController
@RequestMapping("/GoMart/category")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
	
	@Autowired
	CategoryService categoryService;
	
	
	// Get All Category Present In Software
	@GetMapping
	public List<CategoryMaster> getAllCategories(){
		return categoryService.getAllCategories();
	}
	
	// To Add A New Category 
	@PostMapping("/addCategory")
	public ResponseEntity<String> addCategory(@RequestParam("categoryname") String categoryname, @RequestParam("image") MultipartFile image){
		if(categoryService.isCategoryAllreadyExists(categoryname)) {
			
			System.err.println("===== CATEGORY ALLREADY EXISTS =====");
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Category Already Exists");
			
		}
		else {
			
			try {
				
				categoryService.addCategory(categoryname, image);
				System.err.println("===== CATEGORY ADDED SUCCESSFULLY =====");
				return ResponseEntity.status(HttpStatus.CREATED).body(" Category Added ");
			}
			catch(IOException e){
				
				System.err.println("===== FAILED TO UPLOAD IMAGE ===== ");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Upload Image");
			}
		}
	}
	
	// To Update A Existing Category
	@PutMapping("/updateCategory/{categoryid}")
	public ResponseEntity<String> updateCategory(@PathVariable int categoryid,@RequestParam("categoryname") String categoryname, @RequestParam("image") MultipartFile image){
		try {
			
			categoryService.updateCategory(categoryid, categoryname, image);
			System.err.println("===== CATEGORY UPDATED SUCCESSFULLY =====");
			return ResponseEntity.ok("Category Updated Successfully ");
		}
		catch(IOException e) {
			System.err.println("===== FAILED TO UPLOAD IMAGE =====");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to Upload Image");
		}
	}
	
	// To Delete the Category
	@DeleteMapping("/deleteCategory/{categoryid}")  
	public ResponseEntity<String> deleteCategory(@PathVariable int categoryid){
		categoryService.deleteCategory(categoryid);
		System.err.println("===== CATEGORY DELETED SUCCESSFULLY ===== ");
		return ResponseEntity.ok("Category Deleted Successfully");
	}
	
	
	
}
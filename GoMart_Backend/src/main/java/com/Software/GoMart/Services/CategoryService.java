package com.Software.GoMart.Services;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Software.GoMart.Entites.CategoryMaster;
import com.Software.GoMart.Repositiory.CategoryRepositiroy;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepositiroy categoryRepo;
	
	@Autowired
	Cloudinary cloudnary;
		
	// To Handel The Uploaded Image
	@SuppressWarnings("rawtypes")
	private String saveImage(MultipartFile image) throws IOException{
		if(image != null && !image.isEmpty()) {
			Map uploadResult = cloudnary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
			return uploadResult.get("url").toString();
		}
		else{
			
			return null;
		}
	}
	
	
	// Add Category Logic
	public CategoryMaster addCategory(String categoryname,MultipartFile image) throws IOException{
		CategoryMaster category = new CategoryMaster();
		category.setCreatedon(LocalDate.now());
		category.setCategoryname(categoryname);
		String category_image =saveImage(image);
		category.setCategory_image(category_image);
		return categoryRepo.save(category);
	}
	
	//if Category Already Present logic 
	public boolean isCategoryAllreadyExists(String categoryname) {
		return categoryRepo.findByCategoryname(categoryname).isPresent();
	}
	
	
	// Update Category Logic
	public CategoryMaster updateCategory(int categoryid,String categoryname,MultipartFile image) throws IOException{
		CategoryMaster category = categoryRepo.findById(categoryid).orElseThrow(() -> new RuntimeException("Category Not Found"));
		category.setCreatedon(LocalDate.now());
		category.setCategoryname(categoryname);
		
		if(image != null && !image.isEmpty()) {
			
			String category_image = saveImage(image);
			category.setCategory_image(category_image);	
		}
		
		return categoryRepo.save(category);
	}
	
	
	// Delete Category Logic
	public void deleteCategory(int categoryid) {
		CategoryMaster category = categoryRepo.findById(categoryid).orElseThrow(() -> new RuntimeException("Category Not Found"));
		if(category.getCategory_image() != null) {
			String publicId = category.getCategory_image().substring(category.getCategory_image().lastIndexOf("/") + 1, category.getCategory_image().lastIndexOf("."));
			try {
				
				cloudnary.uploader().destroy(publicId, ObjectUtils.emptyMap());
			}
			catch(IOException e) {
				throw new RuntimeException("Failed to delete image", e);
			}
		}
		
		categoryRepo.deleteById(categoryid);
	}
	
	
	//Find All Categories Logic
	public List<CategoryMaster> getAllCategories(){
		return categoryRepo.findAll();
	}
	
	
	
}

package com.Software.GoMart.Controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Software.GoMart.Entites.SettingMaster;
import com.Software.GoMart.Services.SettingService;

@RestController
@RequestMapping("/GoMart/settings")
@CrossOrigin(origins = "http://localhost:5173")
public class SettingController {
	
	@Autowired
	SettingService settingService;
	
	@GetMapping
	public List<SettingMaster> getAllSettings(){
		return settingService.getAllSetings();
	}
	@PostMapping("/addSettings")
	public ResponseEntity<String> addSetting(@RequestParam("business_name") String business_name, @RequestParam("business_mobile") String business_mobile,@RequestParam("business_email") String business_email,@RequestParam("business_address") String business_address, @RequestParam("business_gst_number") String business_gst_number, @RequestParam("image") MultipartFile image){
		try {
			
			settingService.addSettings(business_name, business_mobile, business_email, business_address, business_gst_number, image);
			System.err.println("===== SETTING ADDED SUCCESSFULLY =====");
			return ResponseEntity.status(HttpStatus.CREATED).body("Setting Added Successfully");
		}
		catch (IOException e) {
			
			System.err.println("===== FAILED TO UPLOAD IMAGE =====");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload logo");
		}
	}
	
	@PutMapping("/updateSettings/{settingid}")
	public ResponseEntity<String> updateSettings(@PathVariable("settingid") int settingid,@RequestParam("business_name") String business_name, @RequestParam("business_mobile") String business_mobile,@RequestParam("business_email") String business_email,@RequestParam("business_address") String business_address, @RequestParam("business_gst_number") String business_gst_number, @RequestParam("image") MultipartFile image){
		try {
			
			settingService.updateSettings(settingid, business_name, business_mobile, business_email, business_address, business_gst_number, image);
			System.err.println("===== SETTING UPDATED SUCCESSFULLY =====");
			return ResponseEntity.ok("Setting Updated Successfully");
		}
		catch ( IOException e) {
			
			System.err.println("===== FAILED TO UPLOAD IMAGE =====");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload logo");
		}
	}

}

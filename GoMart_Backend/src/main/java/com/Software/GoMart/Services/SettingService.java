package com.Software.GoMart.Services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.Software.GoMart.Entites.SettingMaster;
import com.Software.GoMart.Repositiory.SettingRepositiory;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service

public class SettingService {
	
	@Autowired
	private SettingRepositiory settingRepo;
	
	@Autowired
	Cloudinary cloudnary;
	
	@SuppressWarnings("rawtypes")
	private String saveImage(MultipartFile image) throws IOException{
		if(image != null && !image.isEmpty()) {
			 Map uploadResult = cloudnary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
	            return uploadResult.get("url").toString();
		}
		
		return null;
	}
	
	public List<SettingMaster> getAllSetings(){
		return settingRepo.findAll();
	}

	public SettingMaster addSettings(String business_name, String business_mobile, String business_email, String business_address, String business_gst_number, MultipartFile image) throws IOException {
		 SettingMaster setting = new SettingMaster();
	     setting.setBusiness_name(business_name);
	     setting.setBusiness_mobile(business_mobile);
	     setting.setBusiness_email(business_email);
	     setting.setBusiness_address(business_address);
	     setting.setBusiness_gst_number(business_gst_number);

         if (image != null && !image.isEmpty()) {
             String business_logo = saveImage(image);
             setting.setBusiness_logo(business_logo);
         }

	        return settingRepo.save(setting);
	}
	
	// To Update Business settings
	
	public SettingMaster updateSettings(int settingid,String business_name, String business_mobile, String business_email, String business_address, String business_gst_number, MultipartFile image) throws IOException {
		SettingMaster setting = settingRepo.findById(settingid).orElseThrow(() -> new RuntimeException("Product Not Found"));
		setting.setBusiness_name(business_name);
		setting.setBusiness_email(business_email);
		setting.setBusiness_address(business_address);
		setting.setBusiness_mobile(business_mobile);
		setting.setBusiness_gst_number(business_gst_number);
		
		if(image != null && !image.isEmpty()) {
			String business_logo = saveImage(image);
			setting.setBusiness_logo(business_logo);
		}
		
		return settingRepo.save(setting);
	}
}




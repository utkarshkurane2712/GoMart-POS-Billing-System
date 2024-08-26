package com.Software.GoMart.Configration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;


@Configuration
public class ProjectConfig {
	
	    @Bean
	    public Cloudinary cloudinary() {
	        return new Cloudinary(ObjectUtils.asMap(
	                "cloud_name", "Cloud_Name",
	                "api_key", "API_Key",      
	                "api_secret", "API_Secret"));
	    }
}

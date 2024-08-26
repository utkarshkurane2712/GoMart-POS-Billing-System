package com.Software.GoMart.Repositiory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.Software.GoMart.Entites.ProductMaster;

@Repository
public interface ProductRepositiroy extends JpaRepository<ProductMaster, Integer> {

	Optional<ProductMaster> findByProductname(String productname);
	@Query("SELECT p FROM ProductMaster p WHERE p.categoryMaster.categoryname = ?1")
	List<ProductMaster> findByCategoryMaster(String categoryname);
	

}

package com.Software.GoMart.Repositiory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Software.GoMart.Entites.CategoryMaster;


@Repository
public interface CategoryRepositiroy extends JpaRepository<CategoryMaster, Integer> {
	
	Optional<CategoryMaster> findByCategoryname(String categoryname);
}

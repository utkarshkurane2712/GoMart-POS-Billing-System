package com.Software.GoMart.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Software.GoMart.Entites.CustomerMaster;

@Repository
public interface CustomerRepositiory extends JpaRepository <CustomerMaster, Integer> {


}

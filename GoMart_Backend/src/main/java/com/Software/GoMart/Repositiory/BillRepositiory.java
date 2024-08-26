package com.Software.GoMart.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Software.GoMart.Entites.BillMaster;

@Repository
public interface BillRepositiory extends JpaRepository<BillMaster, Integer>{

}

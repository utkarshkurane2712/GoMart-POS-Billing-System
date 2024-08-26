package com.Software.GoMart.Repositiory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Software.GoMart.Entites.SettingMaster;

@Repository
public interface SettingRepositiory extends JpaRepository<SettingMaster, Integer> {

}

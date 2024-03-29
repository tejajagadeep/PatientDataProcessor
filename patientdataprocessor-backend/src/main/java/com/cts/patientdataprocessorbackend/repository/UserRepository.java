package com.cts.patientdataprocessorbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.patientdataprocessorbackend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{

	public User findByUserName(String userName);
}

package com.cts.authenticationmicroservice.service;

import java.util.List;

import com.cts.authenticationmicroservice.model.UserRole;

public interface UserRoleService {

//	public List<UserRole> getAllUser();

	public UserRole save(UserRole userRole);
	public UserRole getUserByUserName(String userName);
}

package com.cts.authenticationmicroservice.proxy;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cts.authenticationmicroservice.model.Report;

@FeignClient(name = "reports", path = "/api/v1.0/report")
public interface ReportProxy {
	
//	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
//	@GetMapping("/api/v1.0/report/getAllReports")
//	public ResponseEntity<List<Report>> getAllReports();
	
	@PreAuthorize("hasRole('ROLE_DOCTOR')")
	@GetMapping("/contactNumber/{contactNumber}")
	public ResponseEntity<List<Report>> getAllByContactNumber(@PathVariable Long contactNumber);
	
	@PreAuthorize("hasRole('ROLE_DOCTOR')")
	@PostMapping("/saveReport")
	public ResponseEntity<Report> saveReport(@RequestBody Report report);
	
	@PreAuthorize("hasRole('ROLE_DOCTOR')")
	@DeleteMapping("/id/{id}")
	public ResponseEntity<List<Report>> delete(@PathVariable int id);
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
	@DeleteMapping("/contactNumber/{contactNumber}")
	public ResponseEntity<List<Report>> deleteAllByContactNumber(@PathVariable Long contactNumber);
}

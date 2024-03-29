package com.cts.patientdataprocessorbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.patientdataprocessorbackend.model.Results;
import com.cts.patientdataprocessorbackend.service.ResultsService;

@RestController
@RequestMapping("/api/v1.0/results")
@CrossOrigin(origins="*")
public class ResultsController {
	
	@Autowired
	ResultsService resultsService;
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
	@GetMapping("/contactNumber/{contactNumber}")
	public ResponseEntity<List<Results>> getByContactNumber(@PathVariable Long contactNumber) {
		return new ResponseEntity<>(resultsService.getByContactNumber(contactNumber),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
	@PostMapping("")
	public ResponseEntity<Results> saveResults(@RequestBody Results results) {
		return new ResponseEntity<>(resultsService.saveResults(results),HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DOCTOR')")
	@DeleteMapping("/id/{id}")
	public ResponseEntity<List<Results>> delete(@PathVariable int id) {
		return new ResponseEntity<>(resultsService.delete(id),HttpStatus.OK);
	}
}

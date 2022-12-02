package com.cts.patientdataprocessorreport.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.patientdataprocessorreport.model.Report;
import com.cts.patientdataprocessorreport.service.ReportService;

@RestController
@RequestMapping("/api/v1.0/report")
@CrossOrigin(origins="*")
public class ReportController {
	
	@Autowired
	private ReportService reportService;
	
	@GetMapping("/getAllReports")
	public ResponseEntity<List<Report>> getAllReports(){
		return new ResponseEntity<>(reportService.getAllReports(),HttpStatus.OK);
	}
	
	@PostMapping("/saveReport/{contactNumber}")
	public ResponseEntity<Report> saveReport(@PathVariable Long contactNumber, @RequestBody Report report){
		return new ResponseEntity<>(reportService.saveReport(contactNumber, report),HttpStatus.OK);
	}
	
	@DeleteMapping("/id/{id}")
	public ResponseEntity<List<Report>> delete(@PathVariable int id){
		return new ResponseEntity<>(reportService.delete(id),HttpStatus.OK);
	}
}

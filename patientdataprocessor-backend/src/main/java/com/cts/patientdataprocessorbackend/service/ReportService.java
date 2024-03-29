package com.cts.patientdataprocessorbackend.service;

import java.util.List;

import com.cts.patientdataprocessorbackend.model.Report;

public interface ReportService {
	
	List<Report> getAllReports();
	
	Report saveReport(Report report);

	List<Report> delete(int id);
	
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { Report } from 'src/app/model/report';
import { PatientDataService } from 'src/app/service/data/patient-data.service';
import { ReportsDataService } from 'src/app/service/data/reports-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-patient-reports',
  templateUrl: './view-patient-reports.component.html',
  styleUrls: ['./view-patient-reports.component.css']
})
export class ViewPatientReportsComponent implements OnInit {

  patient!: Patient
  Reports!: Report

  contactNumber!: number
  
  constructor(
    private patientService: PatientDataService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private reportService: ReportsDataService
  ) { }

  navBack(){
    this.location.back();
  }
  
  ngOnInit(): void {
    this.contactNumber = this.route.snapshot.params['contactNumber']
    this.getPatient(this.contactNumber)
  }

  getPatient(contactNumber1: number){
    this.patientService.getByContactNumber(contactNumber1).subscribe(
      response=> this.patient=response
    )
  }

  delete(id: number){
    if(confirm('are you sure want to delte?')){
    this.reportService.deleteReport(id).subscribe(
      response=>{console.log(response),
      this.getPatient(this.contactNumber)}
    )
  }
}
}
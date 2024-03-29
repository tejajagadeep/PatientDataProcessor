import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientDataService } from 'src/app/service/data/patient-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-patient-details',
  templateUrl: './view-patient-details.component.html',
  styleUrls: ['./view-patient-details.component.css']
})
export class ViewPatientDetailsComponent implements OnInit {

  patient!: Patient
  errorMessageResponse!: string
  contactNumber!: number

  constructor(
    private patientService: PatientDataService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  navBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.contactNumber = this.route.snapshot.params['contactNumber']
    this.getPatient(this.contactNumber)
  }

  getPatient(contactNumber1: number) {
    this.patientService.getByContactNumber(contactNumber1).subscribe(
      response => this.patient = response
    )
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { DoctorDataService } from 'src/app/service/data/doctor-data.service';
import { Location } from '@angular/common';
import { PatientDataService } from 'src/app/service/data/patient-data.service';
import { AuthenticationDataService } from 'src/app/service/auth/authentication-data.service';
import { UserDataService } from 'src/app/service/data/user-data.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent implements OnInit {

  doctor!: Doctor
  user!: User
  username!: string

  dummyNumber!: number
  dummyDate!: Date

  errorMessageResponse!: string

  constructor(
    private authService: AuthenticationDataService,
    private userService: UserDataService,
    private doctorService: DoctorDataService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  navBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.doctor = new Doctor('', '', '', '', this.dummyDate, '', '', this.dummyNumber)
    this.username = this.authService.getLoggedInUserName();
    this.getUser();
  }

  getUser() {
    this.userService.getUserByUserName(this.username).subscribe(
      response => this.user = response
    )
  }

  doctorRegistration() {
    this.doctorService.doctorRegistration(this.doctor).subscribe(
      response => {
        this.doctor = response
        this.router.navigate(['home'])
      },
      error => this.errorMessageResponse = error.error.message
    )
  }

  OnlyAlbhabets(event: any): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) || charCode == ' ') {
      return true
    }


    return false;
  }

  OnlyNumbers(event: any): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }


    return true;
  }
}

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

  emailIdT= false
  passwordT= false
  firstNameT= false
  lastNameT= false
  genderT= false
  addressT= false
  dateOfBirthT= false
  contactNumberT= false

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

    if(this.doctor.address===''){
      this.addressT=true
    }
    if(this.doctor.firstName===''){
      this.firstNameT=true
    }
    if(this.doctor.lastName===''){
      this.lastNameT=true
    }
    if(this.doctor.dateOfBirth===this.dummyDate){
      this.dateOfBirthT=true
    }
    if(this.doctor.emailId===''){
      this.emailIdT=true
    }
    if(this.doctor.contactNumber===this.dummyNumber){
      this.contactNumberT=true
    }
    if(this.doctor.gender===''){
      this.genderT=true
    }
    if(this.doctor.password===''){
      this.passwordT=true
    }

    if(this.doctor.address!=='' && this.doctor.firstName!=='' && this.doctor.lastName!=='' && this.doctor.dateOfBirth!==this.dummyDate
       && this.doctor.emailId!=='' && this.doctor.contactNumber!==this.dummyNumber && this.doctor.gender!=='' && this.doctor.password!=='' ) {
    
    this.doctorService.doctorRegistration(this.doctor).subscribe(
      response => {
        this.doctor = response
        this.router.navigate(['home'])
      },
      error => {
        // this.errorMessageResponse = error.error.message

        if(error.error.message.indexOf('Email Id')!= -1){

          this.errorMessageResponse = error.error.message.substring(error.error.message.indexOf('Email Id'))
          this.errorMessageResponse= this.errorMessageResponse.substring(0,this.errorMessageResponse.indexOf('.'))
        
        }
        // else if(error.error.message.indexOf('Contact Number')!= -1){
        //   this.errorMessageResponse = error.error.message.substring(error.error.message.indexOf('Contact Number'))
        //   this.errorMessageResponse= this.errorMessageResponse.substring(0,this.errorMessageResponse.indexOf('.'))
          
        // };
        if (error.error.message.indexOf('Load balancer does not contain an instance for the service doctors')!= -1) {
          this.errorMessageResponse = 'Doctor Service Unavailable.'

        };
        if (error.error.message.indexOf('Connection refused:')!= -1) {
          this.errorMessageResponse = error.error.message

        };
      }
      
    )
       }
  }

  OnlyAlbhabets(event: any): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    //ASCII value of uppercase alphabets – 65 to 90. ASCII value of lowercase alphabets – 97 to 122. decimal 32
    if(charCode == 32 || ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))) {
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

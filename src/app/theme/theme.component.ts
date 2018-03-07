import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CheckDoctorService} from './_services/check-doctor.service';
import {DoctorLoginService} from '../service/doctor-login.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html'
})

export class ThemeComponent implements OnInit{
  constructor(private checkDoctorService: CheckDoctorService,
              private doctorLoginService: DoctorLoginService,
              private router: Router){

  }
  ngOnInit(){
    // this.getDoctorData();
  }
  // getDoctorData() {
  //   this.checkDoctorService.checkDoctor().subscribe(res => {
  //     // console.log(res);
  //     if (res['message'] == 'User does not exist.') {
  //       this.logoutUser();
  //     }
  //   });
  // }
  logoutUser() {
    this.doctorLoginService.logout();
    localStorage.setItem('isloggedin', 'false');
    localStorage.setItem('phone_number', '');
    localStorage.setItem('registration-step-1', 'false');
    localStorage.setItem('registration-step-2', 'false');
    localStorage.clear();
    this.router.navigate(['./login']);
  }
}


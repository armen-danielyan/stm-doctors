import { Component, OnInit } from '@angular/core';
import {DoctorRegistrationService} from '../../service/doctor-registration.service';
import {CognitoCallback, RegistrationUser} from  '../../service/cognito.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-change-number',
  templateUrl: './change-number.component.html',
  styleUrls: ['./change-number.component.scss']
})
export class ChangeNumberComponent implements OnInit, CognitoCallback {
  errorMessage = '';
  registrationUser: RegistrationUser;
  new_phone_number: string;
  old_phone_number: string = this.doctorRegistration.phone_global;
  mask: any[] = ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(public doctorRegistration: DoctorRegistrationService,
              private router: Router) {}


  ngOnInit() {
    this.registrationUser = new RegistrationUser();
    // this.registrationUser.email = localStorage.getItem('email');
    this.registrationUser.email = this.doctorRegistration.email_global;
    // this.registrationUser.password = localStorage.getItem('password');
    this.registrationUser.password = this.doctorRegistration.password_global;
    // this.registrationUser.phone_number = localStorage.getItem('phone_number');
    this.registrationUser.phone_number = this.doctorRegistration.phone_global;

  }
  onSubmit(form: NgForm) {
    form.value.phone_number = form.value.phone_number.split('(').join('').split(')').join('').split('-').join('').split(' ').join('');
    this.doctorRegistration.phone_global = form.value.phone_number;
    this.registrationUser.phone_number = this.doctorRegistration.phone_global;
    this.doctorRegistration.register(this.registrationUser, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { // error
      this.errorMessage = message;
      console.log(this.errorMessage);
      console.log(this.registrationUser.phone_number);
    } else { // success
      this.router.navigate(['./registration-step-2']);
      // this.page = 'register-step-3';
      // this.global_routing.changePage(this.page);
      // localStorage.setItem('phone_number', this.registrationUser.phone_number);
      this.registrationUser.phone_number = this.doctorRegistration.phone_global;
      localStorage.setItem('registration-step-2', 'true');
      console.log('in callback...result: ' + result);
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {CognitoCallback} from '../../../service/cognito.service';
import {DoctorLoginService} from '../../../service/doctor-login.service';
import {Router} from '@angular/router';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [DoctorLoginService]
})
export class ChangePasswordComponent implements CognitoCallback {
  oldpassword: string;
  newpassword: string;
  newpassword_1;
  newpassword_2;
  errorMessage = '';
  phone: string = localStorage.getItem('phone_number');
  type_1 = 'password';
  type_2 = 'password';
  type_3 = 'password';
  checkPasswordIdentity = true;

  constructor(public doctorRegistration: DoctorRegistrationService,
              private router: Router, public doctorService: DoctorLoginService) {
  }

  changePasswords() {
    console.log('new_password' + this.newpassword_2, 'old_password', this.oldpassword, '', this.phone);
    this.doctorRegistration.changePassword(this.oldpassword, this.newpassword_2, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { // error
      this.errorMessage = message;
      if (this.errorMessage === 'Attempt limit exceeded, please try after some time.') {
        this.errorMessage = 'Лимит истек, попробуйте чуть позже';
      }
      if (this.errorMessage === 'Incorrect username or password.') {
        this.errorMessage = 'Старый пароль неверный';
      }
      
    } else { // success
      console.log('Entered ConfirmRegistrationComponent +++');
      this.doctorService.logout();
      this.router.navigate(['/login']);
      // this.page = 'login';
      // this.global_routing.changePage(this.page);
      localStorage.setItem('isloggedin', 'false');
      localStorage.setItem('registration-step-3', 'false');
      localStorage.setItem('phone_number', '');
      localStorage.setItem('registration-step-1', 'false');
      localStorage.setItem('registration-step-2', 'false');
      localStorage.setItem('registration-step-2', 'false');
    }
  }

  checkIdentity() {
    if (this.newpassword_1 === this.newpassword_2) {
      this.checkPasswordIdentity = false;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Пароли не совпадают ';
      this.checkPasswordIdentity = true;
    }
    if(this.newpassword_1.length < 6){
      this.errorMessage = 'Минимальная длина пароля 6 символов';
    } else if(this.newpassword_2.length < 6){
      this.errorMessage = 'Минимальная длина пароля 6 символов';
    }
  }

  typeInpShow_1() {
    this.type_1 = 'string';
  }

  typeInpHiden_1() {
    this.type_1 = 'password';

  }

  typeInpShow_2() {
    this.type_2 = 'string';
  }

  typeInpHiden_2() {
    this.type_2 = 'password';

  }

  typeInpShow_3() {
    this.type_3 = 'string';
  }

  typeInpHiden_3() {
    this.type_3 = 'password';

  }
}

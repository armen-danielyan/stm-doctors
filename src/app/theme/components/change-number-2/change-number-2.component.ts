import {Component, OnInit} from '@angular/core';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';
import {CognitoCallback, CognitoUtil} from '../../../service/cognito.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {DoctorLoginService} from '../../../service/doctor-login.service';

@Component({
  selector: 'app-change-number-2',
  templateUrl: './change-number-2.component.html',
  styleUrls: ['./change-number-2.component.scss']
})
export class ChangeNumber2Component implements CognitoCallback, OnInit {
  newphone = '';
  code = '';
  errorMessage = '';
  oldnumber = '';
  countDown;
  count_resend;
  verifayCode = false;
  confirmationCode: string;
  phone: string;
  phoneverfikeshn = true;
  shownewphone = false;
  start_timer:boolean = false;
  mask: any[] = ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(public doctorRegistration: DoctorRegistrationService,
              public cUtil: CognitoUtil,
              private router: Router,
              public userService: DoctorLoginService) {
    // const cognitoUser = this.cUtil.getCurrentUser();
    // // const that = this;
    // cognitoUser.getSession((err, session) => {
    //   if (err) {
    //     alert(err);
    //     return;
    //   }
    //   this.oldnumber = session.getIdToken().payload.phone_number;
    // });
    this.oldnumber = localStorage.getItem('phone_number');
  }
  show() {
    this.shownewphone = false;
    this.phoneverfikeshn = true;
    this.verifayCode = false;
    this.start_timer = false;

  }

  ngOnInit() {
    this.countDown = Observable.timer(0, 1000)
      .take(this.count_resend)
      .map(() => --this.count_resend);
  }

  changePhone() {
    this.newphone = this.newphone.split('(').join('').split(')').join('').split('-').join('').split(' ').join('');
    console.log(this.newphone);
    this.doctorRegistration.changeNumber(this.newphone, this);
    this.verifayCode = true;
    this.phoneverfikeshn = false;
    this.shownewphone = true;
    this.start_timer = true;
  }

  VerificationCode() {
    this.doctorRegistration.VerificationCode(this.code, this);
    this.userService.logout();
    alert('Номер телефона Изменен');
    localStorage.setItem('isloggedin', 'false');
    localStorage.setItem('phone_number', '');
    localStorage.setItem('registration-step-1', 'false');
    localStorage.setItem('registration-step-2', 'false');
    localStorage.setItem('registration-step-3', 'false');
    localStorage.clear();
    this.router.navigate(['./login']);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { // error
      console.log(message);
      this.errorMessage = message;
    } else { // success
      this.verifayCode = true;
      this.phoneverfikeshn = false;
      console.log('ok');
    }
  }
  resendCode() {
    this.count_resend = 8;
     this.doctorRegistration.resendCodeRegister(this.phone);
    this.countDown = Observable.timer(0, 1000)
      .take(this.count_resend)
      .map(() => --this.count_resend);
    this.confirmationCode = '';
    this.errorMessage = null;
  }

}

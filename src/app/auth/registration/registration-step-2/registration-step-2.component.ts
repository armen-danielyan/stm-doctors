import {Component, OnInit} from '@angular/core';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';
import {Router} from '@angular/router';
import {CognitoCallback} from '../../../service/cognito.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {DoctorCrudService} from '../../_services/doctor-crud.service';


@Component({
  selector: 'app-registration-step-2',
  templateUrl: './registration-step-2.component.html',
  styleUrls: ['./registration-step-2.component.scss']
})
export class RegistrationStep2Component implements OnInit {
  errorMessage = '';
  confirmationCode: string;
  phone: string;
  countDown;
  count_resend = 59;
  service_rules_html;
  privacy_policy_html;
  show_waiting_time;


  constructor(public doctorRegistration: DoctorRegistrationService,
              public router: Router,
              private userAggr: DoctorCrudService) {
  }


  ngOnInit() {
    this.phone = localStorage.getItem('phone_number');
    this.phone = this.doctorRegistration.phone_global;

    this.getTimer(this.count_resend);
    this.userAggr.getServiceRules().subscribe(response => {
      this.service_rules_html = response['text'];
      console.log(this.service_rules_html);
    });
    this.userAggr.getPrivacyPolicy().subscribe(response => {
      this.privacy_policy_html = response['text'];
      console.log(this.privacy_policy_html);
    });
  }

  redirectStartPage() {
    this.router.navigate(['./login']);
  }

  onConfirmRegistration() {
    console.log(this.phone, '', this.confirmationCode);
    this.phone = this.phone.split('(').join('').split(')').join('').split('-').join('').split(' ').join('');
    this.doctorRegistration.confirmRegistration(this.phone, this.confirmationCode, this);
  }

  redirectChangeNumber() {
    this.router.navigate(['./change-number']);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { // error
      this.errorMessage = 'Неправильный код';
    } else { // success
      localStorage.setItem('phone_number', this.doctorRegistration.phone_global);
      console.log('Entered ConfirmRegistrationComponent');
      if (this.phone != null) {
        this.router.navigate(['./user-agreement']);
        // this.page = 'login';
        // this.global_routing.changePage(this.page);
      }
    }
  }

  resendCode() {
    this.count_resend = 59;
    this.doctorRegistration.resendCodeRegister(this.phone);
    this.getTimer(this.count_resend);
    this.confirmationCode = '';
    this.errorMessage = null;
  }

  help() {
    this.router.navigate(['./enter-problem']);
  }
  getTimer(sec) {

    const myTimer = setInterval(() => {
      if (sec > 0) {
        sec--;
        if (sec < 60) {
          this.show_waiting_time = sec + ' сек.';
        } else {
          this.show_waiting_time = Math.floor(sec / 60) + ' мин. ' + sec % 60 + ' сек.';
        }
      } else {
        clearInterval(myTimer);
      }
      if(sec == 0 ){
        this.count_resend = 0;
      }
    }, 1000);
  }
}

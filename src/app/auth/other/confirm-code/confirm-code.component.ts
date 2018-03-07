import { Component, OnInit } from '@angular/core';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {DoctorCrudService} from '../../_services/doctor-crud.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {
  errorMessage = '';
  confirmationCode: string;
  phone: string;
  countDown;
  count_resend = 0;
  service_rules_html;
  privacy_policy_html;


  constructor(public doctorRegistration: DoctorRegistrationService,
              public router: Router,
              private userAggr: DoctorCrudService) {
  }


  ngOnInit() {
    this.userAggr.getServiceRules().subscribe(response => {
      this.service_rules_html = response['text'];
      console.log(this.service_rules_html);
    });
    this.userAggr.getPrivacyPolicy().subscribe(response => {
      this.privacy_policy_html = response['text'];
      console.log(this.privacy_policy_html);
    });
    this.phone = localStorage.getItem('phone_number');
    // this.phone = this.doctorRegistration.phone_global;
    this.countDown = Observable.timer(0, 1000)
      .take(this.count_resend)
      .map(() => --this.count_resend);
    console.log(this.phone);
    this.resendCode();
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
        this.errorMessage = 'OK';
        this.router.navigate(['./login']);
        // this.page = 'login';
        // this.global_routing.changePage(this.page);
      }
    }
  }

  resendCode() {
    this.count_resend = 59;
    this.doctorRegistration.resendCodeRegister(this.phone);
    this.countDown = Observable.timer(0, 1000)
      .take(this.count_resend)
      .map(() => --this.count_resend);
    this.confirmationCode = '';
    this.errorMessage = null;
  }
  help() {
    this.router.navigate(['./enter-problem']);
  }
}

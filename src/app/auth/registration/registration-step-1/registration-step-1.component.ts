import {Component, OnInit} from '@angular/core';
import {CognitoCallback, RegistrationUser} from '../../../service/cognito.service';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DoctorCrudService} from '../../_services/doctor-crud.service';

@Component({
  selector: 'app-registration-step-1',
  templateUrl: './registration-step-1.component.html',
  styleUrls: ['./registration-step-1.component.scss']
})
export class RegistrationStep1Component implements OnInit {
  errorMessage = '';
  type = 'password';
  registrationUser: RegistrationUser;
  service_rules_html;
  privacy_policy_html;
  mask: any[] = ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(public doctorRegistration: DoctorRegistrationService, private router: Router, private userAggr: DoctorCrudService) {
    this.registrationUser = new RegistrationUser();
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
  }

  onSubmit(form: NgForm) {

    if (form.invalid) {
      return false;
    }

    console.log(form.value.phone, form.value.pwd);
    this.doctorRegistration.password_global = form.value.pwd;
    form.value.phone = form.value.phone.split('(').join('').split(')').join('').split('-').join('').split(' ').join('');
    this.doctorRegistration.phone_global = form.value.phone;
    console.log(form.value.phone);

    if (this.doctorRegistration.phone_global !== this.doctorRegistration.password_global) {
      this.doctorRegistration.register({phone_number: form.value.phone, password: form.value.pwd}, this);
    } else {
      this.errorMessage = 'Your number and password must not be the same';
    }
  }

  redirectStartPage() {
    this.router.navigate(['./login']);
  }

  cognitoCallback(message: string, result: any) {
    if (message === 'An account with the given phone_number already exists.') { // error
      this.errorMessage = 'Пользователь существует';

      // this.router.navigate(['./confirm-code']);
    }  else  { // success
      console.log('**********');
      console.log(message);

      localStorage.setItem('registration-step-1', 'true');
      this.router.navigate(['./registration-step-2']);
      console.log('in callback...result: ' + result);
    }
  }

  typeInpShow() {
    this.type = 'string';
  }

  typeInpHiden() {
    this.type = 'password';

  }
  help() {
    this.router.navigate(['./enter-problem']);
  }
}


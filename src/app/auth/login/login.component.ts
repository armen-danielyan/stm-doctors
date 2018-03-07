import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorLoginService} from '../../service/doctor-login.service';
import {DoctorRegistrationService} from '../../service/doctor-registration.service';
import {NgForm} from '@angular/forms';
import {DoctorCrudService} from '../_services/doctor-crud.service';
import {CheckDoctorService} from '../../theme/_services/check-doctor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  errorMessage = '';
  phone_number: string;
  password: string;
  remember: boolean;
  service_rules_html;
  privacy_policy_html;

  mask: any[] = ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private router: Router,
              public userService: DoctorLoginService,
              public registerService: DoctorRegistrationService,
              public doctorRegistration: DoctorRegistrationService,
              private userAggr: DoctorCrudService) {
    localStorage.setItem('registration-step-1', 'false');
    localStorage.setItem('registration-step-2', 'false');
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

  redirectUserAgreement() {
    this.router.navigate(['./registration-step-1']);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return false;
    }

    form.value.phone_number = form.value.phone_number.split('(').join('').split(')').join('').split('-').join('').split(' ').join('');
    if (form.value.phone_number == null || this.password == null) {
      this.errorMessage = 'loggin inputs null';
      return;
    }

    localStorage.setItem('phone_number', form.value.phone_number);

    this.registerService.isloginpassword_global = this.password;
    this.userService.authenticate(form.value.phone_number, this.password, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message === 'User is not confirmed.') { // error
      console.log('User is not confirmed');
      console.log(message);
      this.errorMessage = 'Пользователь не подтвержден!';
      this.router.navigate(['/confirm-code']);
    } else if (message === 'User does not exist.') {
      console.log('************ User does not exist.');
      this.errorMessage = 'Пользователь не  существует!';
    } else if (message === 'Incorrect username or password.') {
      this.errorMessage = 'Неправильный логин или пароль!';
    } else { // success
      localStorage.setItem('isloggedin', 'true');
      localStorage.setItem('personal_data_page', 'true');
      localStorage.setItem('registration-step-1', 'true');
      localStorage.setItem('registration-step-2', 'true');
      this.router.navigate(['/index']);
    }
  }

  isLoggedInCallback(message: string, isLoggedIn: boolean) {
    console.log('The user is logged in: ' + isLoggedIn + 'adda');
  }

  forgotPass() {
    localStorage.setItem('reset-password-1', 'true');
    this.router.navigate(['./reset-password-1']);
  }

  help() {
    this.router.navigate(['./enter-problem']);
  }
}

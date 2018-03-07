import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-reset-password-2',
  templateUrl: './reset-password-2.component.html',
  styleUrls: ['./reset-password-2.component.scss']
})

export class ResetPassword2Component implements OnInit {
  errorMessage = '';
  confirmationCode: string;
  phone: string;
  new_pass: string;
  count_resend;
  countDown;
  type = 'password';
  mask: any[] = ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private router: Router,
              public registerService: DoctorRegistrationService) { }

  ngOnInit() {
     this.phone = this.registerService.reset_phone_number;
   // this.phone = localStorage.getItem('phone_number');
    this.countDown = Observable.timer(0, 1000)
      .take(this.count_resend)
      .map(() => --this.count_resend);
  }


  onSubmit(form: NgForm) {
    form.value.phone_number = form.value.phone_number.split('(').join('').split(')').join('').split('-').join('').split(' ').join('')
   this.phone = form.value.phone_number;
    console.log(this.phone);
    this.registerService.confirmnewpass( this.phone, this.confirmationCode, this.new_pass);
    setTimeout(() => {
      this.router.navigate(['./login']);
    }, 1000);
  }
  resendCode() {
    this.count_resend = 59;
     this.registerService.forgotpass(this.phone);
    this.countDown = Observable.timer(0, 1000)
      .take(this.count_resend)
      .map(() => --this.count_resend);
    this.confirmationCode = '';
    this.errorMessage = null;
  }
  typeInpShow() {
    this.type = 'string';
  }

  typeInpHiden() {
    this.type = 'password';

  }
}

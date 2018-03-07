import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-reset-password-1',
  templateUrl: './reset-password-1.component.html',
  styleUrls: ['./reset-password-1.component.scss']
})
export class ResetPassword1Component implements OnInit {
  mask: any[] = ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private router: Router, public registerService: DoctorRegistrationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    form.value.phone_number = form.value.phone_number.split('(').join('').split(')').join('').split('-').join('').split(' ').join('');
    this.registerService.reset_phone_number = form.value.phone_number;
    this.registerService.forgotpass(form.value.phone_number);
    this.router.navigate(['./reset-password-2']);
  }

}

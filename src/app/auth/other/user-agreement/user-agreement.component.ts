import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorLoginService} from '../../../service/doctor-login.service';
import {DoctorRegistrationService} from '../../../service/doctor-registration.service';
import {DoctorCrudService} from '../../_services/doctor-crud.service';
import {NgForm} from '@angular/forms';
import {CognitoUtil} from '../../../service/cognito.service';


@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss']
})
export class UserAgreementComponent implements OnInit {

  service_rules_html;
  privacy_policy_html;

  constructor(private router: Router,
              private userService: DoctorLoginService,
              public registerService: DoctorRegistrationService,
              private userAggr: DoctorCrudService,
              private cUtil: CognitoUtil,
              private doctorCrudService: DoctorCrudService) {
  }

  ngOnInit() {
    localStorage.setItem('registration-step-2', 'true');
    this.userAggr.getServiceRules().subscribe(response => {
      this.service_rules_html = response['text'];
      console.log(this.service_rules_html);
    });
    this.userAggr.getPrivacyPolicy().subscribe(response => {
      this.privacy_policy_html = response['text'];
      console.log(this.privacy_policy_html);
    });
    console.log(this.registerService.password_global, this.registerService.phone_global);
    this.userService.authenticate(this.registerService.phone_global, this.registerService.password_global, this);
  }

  cognitoCallback(message: string, result: any) {
    localStorage.setItem('registration-step-1', 'true');
    console.log('in callback...result: ' + result);

    localStorage.setItem('isloggedin', 'true');
    localStorage.setItem('registration-step-1', 'true');
    localStorage.setItem('registration-step-2', 'true');
  }


  goNext() {
    // console.log(this.registerService.password_global, this.registerService.phone_global);
  }

  help() {
    this.router.navigate(['./enter-problem']);
  }

  onSubmit(form: NgForm) {
    // if (form.valid) {
    //   form.value.username = this.cUtil.getCurrentUser().getUsername();
    //   this.doctorCrudService.sendAgreement(form.value).subscribe(res => {
    //     console.log(res);
    //     this.router.navigate(['./registration-proffesion']);
    //   });
    // }
    this.router.navigate(['./registration-proffesion']);
  }

}

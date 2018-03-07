import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DoctorCrudService} from '../../_services/doctor-crud.service';
import {Router} from '@angular/router';
import {ClickoutsideService} from '../../_services/clickoutside.service';

@Component({
  selector: 'app-enter-problem',
  templateUrl: './enter-problem.component.html',
  styleUrls: ['./enter-problem.component.scss'],
  providers: [ClickoutsideService]
})
export class EnterProblemComponent implements OnInit {
  subject = [
    {name: 'Потерян доступ к аккаунту'},
    {name: 'Неизвестная проблема'}
  ];
  isOpen = false;
  default = 'Потерян доступ к аккаунту';
  service_rules_html;
  privacy_policy_html;

  constructor(private userAggr: DoctorCrudService,
              private router: Router,
              private clickoutsideService: ClickoutsideService) {
  }
  clickOut() {
    this.clickoutsideService.onClickedOutside(event);
    this.isOpen = this.clickoutsideService.isOpen;
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
  }
  isOpened() {
    this.isOpen = !this.isOpen;
  }

  help() {
    this.router.navigate(['./enter-problem']);
  }

  onSelect(name) {
    this.default = name;
    this.isOpen = false;
  }

  rediredtConfirm(form: NgForm) {
     this.router.navigate(['./confirm-problem']);
    console.log(form.value);
  }
}

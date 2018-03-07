import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DoctorCrudService} from '../auth/_services/doctor-crud.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  service_rules_html;
  privacy_policy_html;
  constructor( private router: Router,
               private userAggr: DoctorCrudService) { }

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

  help() {
    this.router.navigate(['./enter-problem']);
    }

}

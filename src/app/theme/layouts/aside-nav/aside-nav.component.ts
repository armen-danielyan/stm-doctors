import { Component, OnInit } from '@angular/core';
import {DoctorCrudService} from '../../../auth/_services/doctor-crud.service';
import {ClickoutsideService} from '../../../auth/_services/clickoutside.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
  providers: [ClickoutsideService]
})
export class AsideNavComponent implements OnInit {
  service_rules_html;
  privacy_policy_html;
  constructor(private userAggr: DoctorCrudService) { }

  ngOnInit() {
    this.userAggr.getServiceRules().subscribe(response => {
      this.service_rules_html = response['text'];
    });
    this.userAggr.getPrivacyPolicy().subscribe(response => {
      this.privacy_policy_html = response['text'];
    });
  }
}

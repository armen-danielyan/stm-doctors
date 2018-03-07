import {Component, OnInit} from '@angular/core';
import {CheckDoctorService} from '../../_services/check-doctor.service';
import {DoctorLoginService} from '../../../service/doctor-login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  getDbInfo = true;
  doctorData: any = {
    first_name: '',
    last_name: ''
  };

  constructor(private checkDoctorService: CheckDoctorService,
              private doctorLoginService: DoctorLoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.getDoctorData();
  }

  getDoctorData() {
    this.checkDoctorService.checkDoctor().subscribe(res => {
     // console.log(res);
      this.doctorData = res;
      this.getDbInfo = false;
      if (res['message'] == 'User does not exist.') {
         this.logoutUser();
      }
    });
  }
  logoutUser() {
    this.doctorLoginService.logout();
    localStorage.setItem('isloggedin', 'false');
    localStorage.setItem('phone_number', '');
    localStorage.setItem('registration-step-1', 'false');
    localStorage.setItem('registration-step-2', 'false');
    localStorage.clear();
    this.router.navigate(['./login']);
  }

}

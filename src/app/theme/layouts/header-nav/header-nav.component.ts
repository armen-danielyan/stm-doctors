import {Component, OnInit} from '@angular/core';
import {DoctorLoginService} from '../../../service/doctor-login.service';
import {Router} from '@angular/router';
import {CognitoUtil} from '../../../service/cognito.service';
import {CheckDoctorService} from '../../_services/check-doctor.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  pathimg = '';
  doctorData: any = {
    first_name: '',
    last_name: ''
  };
  private s3Provider: any = environment.aws.s3.provider;

  constructor(
    private router: Router,
    public doctorLoginService: DoctorLoginService,
    public cUtil: CognitoUtil,
    public checkDoctorService: CheckDoctorService,
    private http: HttpClient
  ) {}


  ngOnInit() {
    this.getDoctorData();
    const cognitoUser = this.cUtil.getCurrentUser();

    this.pathimg = `https://s3.${this.s3Provider.region}.amazonaws.com/${this.s3Provider.bucket}/` +
      this.cUtil.getCurrentUser().getUsername() + '/' + 'avatar.jpeg';

    this.http.get( this.pathimg )
      // .catch( (err: any, caught: Observable<any>) => {
      //   this.pathimg = '/assets/img/profile/profile-default.svg';
      //   return new Observable(err);
      // })
      .subscribe( res => console.log('User has avatar') );

    this.checkDoctorService.checkDoctor()
    .subscribe(res => {
       this.doctorData = res;
       console.log(' this.doctorData ', this.doctorData);
    });

    this.doctorLoginService.StartedLoadingImageEvent
      .subscribe( () => {
        console.log('StartedLoadingImageEvent subscriber: loading started');
        this.pathimg = 'http://simpleicon.com/wp-content/uploads/loading-128x128.png';
      });
    this.doctorLoginService.PhotoCreatedEvent
      .subscribe( newImageUrl => {
        console.log('PhotoCreatedEvent subscriber: got a new image url: \n', newImageUrl);
        this.pathimg = newImageUrl;
      });
    this.doctorLoginService.PhotoRemovedEvent
      .subscribe( () => {
        console.log('PhotoRemovedEvent subscriber: photo was removed');
        this.pathimg = '/assets/img/profile/profile-default.svg';
      });
  }

  getDoctorData() {
    this.checkDoctorService.checkDoctor().subscribe(res => {
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
    localStorage.setItem('registration-step-3', 'false');
    localStorage.clear();
    this.router.navigate(['./login']);
    localStorage.setItem('profData', 'false');
    localStorage.setItem('personalInfoData', 'false');
    localStorage.setItem('educationInfo', 'false');
    localStorage.setItem('careerData', 'false');
  }

  redirectToIndex() {
    this.router.navigate(['/index']);
  }
}


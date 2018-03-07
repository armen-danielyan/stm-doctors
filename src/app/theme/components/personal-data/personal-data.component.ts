import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CognitoUtil, User} from '../../../service/cognito.service';
import {Router} from '@angular/router';
import {DoctorLoginService} from '../../../service/doctor-login.service';
import {CheckDoctorService} from '../../_services/check-doctor.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  user: User = new User;
  mask_brth = [/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /\d/, /\d/, /\d/, /\d/];
  newCarObj;
  newEduObj;
  userNumber;
  url = '/assets/img/profile/profile-default.svg';
  dow = true;
  del = false;
  edit = true;
  errorMessage = '';
  educationPart = [
    this.newEduObj
  ];
  careerPart = [this.newCarObj];

  doctorData: any = {
    first_name: '',
    last_name: ''
  };
  private s3Provider: any = environment.aws.s3.provider;


  constructor(
    private router: Router,
    public cUtil: CognitoUtil,
    public doctorLoginService: DoctorLoginService,
    private checkDoctorService: CheckDoctorService,
    private http: HttpClient
  ) {

    this.url = `https://s3.${this.s3Provider.region}.amazonaws.com/${this.s3Provider.bucket}/` +
      this.cUtil.getCurrentUser().getUsername() + '/' + 'avatar.jpeg';

    this.http.get( this.url )
      // .catch( (err: any, caught: Observable<any>) => {
      //   this.url = '/assets/img/profile/profile-default.svg';
      //   return new Observable(err);
      // })
      .subscribe( res => console.log('User has avatar') );

    this.edit = true;
  }

  ngOnInit() {
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }
      this.userNumber = session.getIdToken().payload.phone_number;
    });
    this.getDoctorData();
  }


  newCareerPart() {
    this.careerPart.push(this.newCarObj);
    console.log(this.careerPart.length);
  }



  removeCar(index) {
    this.careerPart.splice(index, 2);
    console.log(index);
  }

  newEducationPart() {
    this.educationPart.push(this.newEduObj);

  }

  removeEdu(index) {
    this.educationPart.splice(index, 1);
  }

  redirectChangePassword() {
    this.router.navigate(['./change-password']);
  }

  redirectChangeNumber() {
    this.router.navigate(['./change-number-2']);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.educationPart);
    console.log(JSON.stringify(form.value));
  }

  readUrl(event: any) {
    if( event.target.files && event.target.files[0] ) {
      if( event.target.files[0].size <= 2500000 ) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);

        this.del = true;
        this.dow = false;
        this.errorMessage = '';
      } else {
        console.log(event.target.files[0].size);
        this.errorMessage = 'The maximum avatar size must be 2.4 M';
        return;
      }
    }

    this.doctorLoginService
      .createPhoto(
        event.target.files[0].name,
        event.target.files[0]
      );
  }

  deletePhoto() {
    this.doctorLoginService.deletePhoto();
    this.url = '/assets/img/profile/profile-default.svg';
    this.del = false;
    this.dow = true;
  }


  getDoctorData() {
    this.checkDoctorService.checkDoctor().subscribe(res => {
      console.log('**** doctor data');
      console.log(res);
      this.doctorData = res;
    });
  }

}

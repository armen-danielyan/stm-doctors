import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {CognitoUtil, User} from '../../../service/cognito.service';
import {DoctorCrudService} from '../../_services/doctor-crud.service';
import {DoctorLoginService} from '../../../service/doctor-login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {CheckDoctorService} from '../../../theme/_services/check-doctor.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-registration-personal-info',
  templateUrl: './registration-personal-info.component.html',
  styleUrls: ['./registration-personal-info.component.scss'],
})
export class RegistrationPersonalInfoComponent implements OnInit {
  private baseUrl: string = environment.api.url;
  user: User = new User;
  citySearchText = '';
  personalInfoData = false;
  profileDisabled = false;
  headers;
  maxDate = new Date();
  defaultCity = '';

  genderName = 'Пол';
  genderId: number;
  active = false;
  url = '/assets/img/profile/profile-default.svg';
  dow = true;
  del = false;

  Countries: any;
  CountrieId;
  City: any;
  errorMessage = '';
  genders: { id: number; name: string }[] = [
    {id: 1, name: 'Мужской'},
    {id: 2, name: 'Женский'}
  ];

  CountrieAll = [];
  show_Countrie = false;
  show_select_City = false;

  constructor(private router: Router,
              private doctorCrudService: DoctorCrudService,
              public doctorService: DoctorLoginService,
              private http: HttpClient,
              public cUtil: CognitoUtil,
              private checkDoctorService: CheckDoctorService) {
  }

  ngOnInit() {
    // this.getCountries();
    this.getDoctorData();
  }

  clickNoAddFileInput() {
    document.getElementById('addFileInput').click();
  }

  onSelectedGender(genderName: string, id: number) {
    this.genderName = genderName;
    this.genderId = id;
    this.active = false;
  }

  searchCountries(ev) {
    const cognitoUser = this.cUtil.getCurrentUser();
    // console.log(cognitoUser);
    cognitoUser.getSession((err, session) => {
      console.log(this.user);
      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
    });
    const a = [];
    if (ev.length <= 3) {
      console.log(ev.length);
      this.show_Countrie = false;
      this.Countries = [];
    }
    if (ev.length >= 3) {
      console.log(this.headers);
      this.http.get(`${this.baseUrl}/doctor/core/reference/country?name=` + ev, {headers: this.headers})
        .subscribe((res) => {
          console.log(res);
          this.Countries = res;
          this.show_Countrie = true;
        });
    }
  }

  searchCity(name) {
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      console.log(this.user);
      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
    });
    if (name.length >= 3) {
      console.log(name);
      this.show_select_City = true;
      if (this.CountrieId !== '') {
       // console.log('this.CountrieId ************');
        console.log(this.CountrieId);
        this.http.get(`${this.baseUrl}/doctor/core/reference/city?country_id=` + this.CountrieId +
          '&name=' + name, {headers: this.headers})
          .subscribe((res) => {
            console.log(res);
            this.City = res;
            this.show_select_City = true;
            // console.log('CITY RES');
            // console.log(res);
            // const response = res['geonames'];
            // this.City = [];
            // for (const city of response) {
            //   this.City.push(city);
            // }
          });
        console.log(this.City);
      }
    } else {
      this.show_select_City = false;
      this.City = [];

    }
  }

  createCity(c) {
    this.defaultCity = c.name;
    this.show_select_City = false;

    console.log(this.citySearchText);
  }


  getCountries(id, name) {
    console.log(id);
    this.citySearchText = name;
    this.show_Countrie = false;
    this.CountrieId = id;
    console.log(name);
  }

  onSubmitProfile(form: NgForm) {
    form.value.gender_id = this.genderId;
    delete form.value.image;
    form.value.birth_date = form.value.birth_date.format('MM.DD.YYYY');
    console.log(form.value);
    console.log(form.value.birth_date._i);
    this.doctorCrudService.addDoctor(form.value).subscribe(response => {
      this.profileDisabled = true;
      console.log(response);
      this.router.navigate(['./registration-education']);
    });
  }


  isActive() {
    this.active = !this.active;
    console.log(this.active);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 2500000) {
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

    this.doctorService.createPhoto(event.target.files[0].name, event.target.files[0]);
  }

  deletePhoto() {
    this.doctorService.deletePhoto();
    this.url = '/assets/img/profile/profile-default.svg';
    this.del = false;
    this.dow = true;
  }
  getDoctorData() {
    this.checkDoctorService.checkDoctor().subscribe(res => {
      console.log('**** doctor data');
      console.log(res);
      if (res['id']) {
        this.router.navigate(['./index']);
      }
    });
  }

  // openCalendar(){
  //   document.getElementsByTagName('button')[1].click();
  // }
}

class Country {
  id: number;
  title: string;
}

class City extends Country {
}


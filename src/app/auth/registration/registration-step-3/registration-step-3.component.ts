import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User, CognitoUtil, DoctorEducation, DoctorCareer} from '../../../service/cognito.service';
import {NgForm} from '@angular/forms';
import {DoctorLoginService} from '../../../service/doctor-login.service';
import {DoctorCrudService} from '../../_services/doctor-crud.service';
import {GetCityService} from '../../_services/get-city.service';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-registration-step-3',
  templateUrl: './registration-step-3.component.html',
  styleUrls: ['./registration-step-3.component.scss']
})
export class RegistrationStep3Component implements OnInit {
  user: User = new User;
  j = 1;
  z = 1;

  sendDoctorInfo = [];
  jsonSendDoctorInfo;

  profileDisabled = false;

  educationLength = [{}];
  educationCount = 0;

  careerLength = [{}];
  careerCount = 0;

  genders: { id: number; name: string }[] = [
    {id: 1, name: 'Male'},
    {id: 2, name: 'Female'}
  ];

  active = false;
  genderName = 'Выберите пол!';
  genderId: number;


  citySearchText = '';
  countries: Country[] = [];
  selectedCountry: Country = new Country();
  showCountriesDiv = true;

  cities: City[] = [];
  defaultCity = '';
  showCitiesDiv = true;


  constructor(private router: Router,
              public userService: DoctorLoginService,
              private doctorCrudService: DoctorCrudService,
              private getCityService: GetCityService) {
  }

  ngOnInit() {
    // this.getGenders();
    this.getCountries();
  }


  logoutUser() {
    this.userService.logout();
    localStorage.setItem('isloggedin', 'false');
    localStorage.setItem('registration-step-3', 'false');
    localStorage.setItem('phone_number', '');
    localStorage.setItem('registration-step-1', 'false');
    localStorage.setItem('registration-step-2', 'false');
    localStorage.clear();
    console.log('Logout OK');
    this.router.navigate(['./login']);
  }


  onSubmit(form: NgForm) {
    console.log(form.value);
    this.router.navigate(['./attach-file']);
    this.sendDoctorInfo.push(form.value);
    this.jsonSendDoctorInfo = JSON.stringify(this.sendDoctorInfo);
    console.log(this.jsonSendDoctorInfo);
  }

  onSubmitWorks(form: NgForm) {
    console.log(form.value);
  }


  getGenders() {
    this.doctorCrudService.getGenders().subscribe(response => {
      this.genders = response;
      console.log(this.genders);
    });
  }


  isActive() {
    this.active = !this.active;
    console.log(this.active);
  }

  onSelectedGender(genderName: string, id: number) {
    this.genderName = genderName;
    this.genderId = id;
    this.active = false;
  }


  onSubmitProfile(form: NgForm) {
    console.log(form.value);
    form.value.gender_id = this.genderId;
    this.doctorCrudService.addDoctor(form.value).subscribe(response => {
      this.profileDisabled = true;
      console.log(response);
    });
  }


  onSubmitEducations(form: NgForm) {
    console.log(form.value);
  }

  addEducation() {
    this.educationLength.push({});
    this.educationCount++;
    console.log(this.educationCount);
  }

  deleteEducation(index: number) {
    this.educationLength.splice(index, 1);
    this.educationCount--;
  }


  onSubmitCareer(form: NgForm) {
    console.log(form.value);
  }

  addCareer() {
    this.careerLength.push({});
    this.careerCount++;
    console.log(this.careerCount);
  }

  deleteCareer(index: number) {
    this.careerLength.splice(index, 1);
    this.careerCount--;
  }


  getCountries() {
    this.getCityService.getCountries().subscribe(data => {
      this.countries = data['response'].items;
    });
  }

  onSelectCountry(country: Country) {
    this.showCountriesDiv = false;
    this.selectedCountry = country;
    this.citySearchText = country.title;
  }

  getCities(text: string) {
    this.getCityService.getCities(this.selectedCountry.id, text).subscribe(data => {
      this.cities = data['response'].items;
    });
  }

  onSelectCity(city: City) {
    this.defaultCity = city.title;
    this.showCitiesDiv = false;
  }


}


class Country {
  id: number;
  title: string;
}

class City extends Country {
}


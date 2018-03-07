import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GetCityService } from '../../_services/get-city.service';
import { DoctorCrudService } from '../../_services/doctor-crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CognitoUtil } from '../../../service/cognito.service';
import { CheckDoctorService } from '../../../theme/_services/check-doctor.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registration-career',
  templateUrl: './registration-career.component.html',
  styleUrls: ['./registration-career.component.scss']
})
export class RegistrationCareerComponent implements OnInit {

  careerForm: FormGroup;

  private baseUrl: string = environment.api.url;

  currentDate = new Date();
  maxDate: Date;
  minDate: Date;

  headers: any;

  listOfCountries: any = [];
  listOfCities: any = [];

  constructor(private router: Router,
    private doctorCrudService: DoctorCrudService,
    private http: HttpClient,
    public cUtil: CognitoUtil,
    private checkDoctorService: CheckDoctorService,
    private formBuilder: FormBuilder) {
    this.createForm();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1500);
  }

  ngOnInit() {
    this.getDoctorData();
  }

  createForm() {
    this.careerForm = this.formBuilder.group({
      careers: this.formBuilder.array([this.formBuilder.group(new Career())])
    });
  }

  get careers(): FormArray {
    return this.careerForm.get('careers') as FormArray;
  };

  addCareer() {
    this.careers.push(this.formBuilder.group(new Career()));
  }

  deletecareer(index: number) {
    const careers = this.careerForm.get('careers') as FormArray;
    careers.removeAt(index);
  }

  getDoctorData() {
    this.checkDoctorService.checkDoctor().subscribe(res => {
      if (res['career'] && res['career'].length > 0) {
        this.router.navigate(['./index']);
      }
    });
  }

  onSubmit() {
    let data = this.prepareSaveCareer();
  
    this.doctorCrudService.addCareers(data).subscribe(response => {
        console.log(response);
    });

    this.router.navigate(['./attach-file']);
  }


  prepareSaveCareer(): any {
    const formModel = this.careerForm.value;

    const careersDeepCopy: Career[] = formModel.careers.map(
      (career: Career) => Object.assign({}, career)
    );
    let careers = careersDeepCopy.map(item => {
      let career: any = {};
      career.country_city = item.country + ' ' + item.city;
      career.name = item.name;
      career.position = item.position;
      career.experience = item.experienceUnix;
      career.recommender = item.recommender;
      career.start_date = item.startDate.format('MM.DD.YYYY');
      return career;
    });

    return careers;
  }

  searchCountries(careerForm: FormGroup) {
    let career = careerForm.value;
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
    });

    if (career.country.length < 3) {
      careerForm.patchValue({ 'displayCountries': false });
      this.listOfCountries = [];
    }

    if (career.country.length >= 3) {
      this.http.get(`${this.baseUrl}/doctor/core/reference/country?name=` + career.country, { headers: this.headers })
        .subscribe((countries) => {
          this.listOfCountries = countries;
          careerForm.patchValue({ 'displayCountries': true });
        });
  }
}

    selectCountry(country: any, careerForm: FormGroup) {
      careerForm.patchValue({ 'displayCountries': false, 'country': country.name, 'countryId': country.id });
    }

    searchCities(careerForm: FormGroup) {
      let career = careerForm.value;
      const cognitoUser = this.cUtil.getCurrentUser();
      cognitoUser.getSession((err, session) => {

        this.headers = new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', session.getIdToken().getJwtToken());
      });

      if (career.city.length < 3) {
        careerForm.patchValue({ 'displayCities': false });
        this.listOfCities = [];
      }

      if (career.city.length >= 3 && career.country !== '') {
        this.http.get(`${this.baseUrl}/doctor/core/reference/city?country_id=` + career.countryId +
          '&name=' + career.city, { headers: this.headers })
          .subscribe((cities) => {
            this.listOfCities = cities;
            careerForm.patchValue({ 'displayCities': true });
          });
      }
    }

    selectCity(city: any, careerForm: FormGroup) {
      careerForm.patchValue({ 'displayCities': false, 'city': city.name });
    }

    calculateExperience(careerForm: FormGroup) {
      let career = careerForm.value;

      this.maxDate = career.endDate;
      this.minDate = career.startDate;

      let startDate = new Date(career.startDate);
      let endDate = new Date(career.endDate);
      let diff = new Date(endDate.getTime() - startDate.getTime());

      let years = diff.getUTCFullYear() - 1970;
      let months = diff.getUTCMonth();
      let days = diff.getUTCDate() - 1;

      let result = '';
 
      if (years) {
        if ((years % 10) == 1) {
          result += years + ' год '; // example: 1, 21, 31, etc.
        }
        if ((years % 10) > 1 && (years % 10) < 5 && (years > 20 || years < 10)) {
          result += years + ' года '; // example: 2, 3, 24, 32, etc.
        }
        if ((years % 10) == 0 || (years % 10) > 4 || ((years < 20) && (years > 4))) {
          result += years + ' лет '; //example: 5, 10, 12, 25, 37 etc.
        }
      }

      if (months) {
        if (months == 1) {
          result += months + ' месяц';
        }
        if (months > 1 && months < 5) {
          result += months + ' месяца';
        }
        if (months > 4) {
          result += months + ' месяцев';
        }
      }
      careerForm.patchValue({ 'experience': result + ' ', 'experienceUnix': diff.getTime()/1000});
    }


  }

class Career {
  name: any = ['', Validators.required];
  position: any = ['', Validators.required];
  startDate: any = ['', Validators.required];
  endDate: any = [''];
  country: any = ['', Validators.required];
  countryId: number = 0;
  city: any = ['', Validators.required];
  experience: any = ['', Validators.required];
  experienceUnix: string = '';
  recommender: any = ['', Validators.required];
  displayCountries: boolean = false;
  displayCities: boolean = false;
}

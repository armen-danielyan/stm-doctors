import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {GetCityService} from '../../_services/get-city.service';
import {DoctorCrudService} from '../../_services/doctor-crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CognitoUtil} from '../../../service/cognito.service';
import {CheckDoctorService} from '../../../theme/_services/check-doctor.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-registration-education',
    templateUrl: './registration-education.component.html',
    styleUrls: ['./registration-education.component.scss']
})
export class RegistrationEducationComponent implements OnInit {

    educationForm: FormGroup;
    maxDate = new Date();
    headers: any;
    listOfCountries: any = [];
    listOfCities: any = [];
    private baseUrl: string = environment.api.url;

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
    };
  


    ngOnInit() {
        this.getDoctorData();
    }

    createForm() {
        this.educationForm = this.formBuilder.group({
            educations: this.formBuilder.array([this.formBuilder.group(new Education())])
        });
  
    }

    get educations(): FormArray {
        return this.educationForm.get('educations') as FormArray;
    };

    addEducation() {
        this.educations.push(this.formBuilder.group(new Education()));
    }

    deleteEducation(index : number) {
        const educations = this.educationForm.get('educations') as FormArray;
        educations.removeAt(index);
    }

    getDoctorData() {
        this.checkDoctorService.checkDoctor().subscribe(res => {
            if (res['education'] && res['education'].length > 0) {
                this.router.navigate(['./index']);
            }
        });
    }

    onSubmit() {
        let data = this.prepareSaveEducation();
        this.doctorCrudService.addEducations(data).subscribe(response => {
            console.log(response);
        });
        this.router.navigate(['./registration-career']);
    }


    prepareSaveEducation(): any {
        const formModel = this.educationForm.value;

        const educationsDeepCopy: Education[] = formModel.educations.map(
            (education: Education) => Object.assign({}, education)
        );
        let educations = educationsDeepCopy.map(item => {
            let education: any = {};
            education.country_city = item.country + ' ' + item.city;
            education.name = item.university;
            education.faculty = item.faculty;
            education.graduated = item.graduated.format('MM.DD.YYYY');
            return education;
        });

        return educations;
    }


    searchCountries(educationForm: FormGroup) {
        let education = educationForm.value;      
        const cognitoUser = this.cUtil.getCurrentUser();
        cognitoUser.getSession((err, session) => {
          this.headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', session.getIdToken().getJwtToken());
        });

        if (education.country.length < 3) {
          educationForm.patchValue({'displayCountries': false });
          this.listOfCountries = [];
        }

        if (education.country.length >= 3) {
          this.http.get(`${this.baseUrl}/doctor/core/reference/country?name=` + education.country, {headers: this.headers})
            .subscribe((countries) => {
              this.listOfCountries = countries;
              educationForm.patchValue({'displayCountries': true });
            });
        }
    }

    selectCountry(country: any, educationForm: FormGroup) {
        educationForm.patchValue({'displayCountries': false, 'country': country.name , 'countryId': country.id});
    }

    searchCities(educationForm: FormGroup) {
        let education = educationForm.value;
        const cognitoUser = this.cUtil.getCurrentUser();
        cognitoUser.getSession((err, session) => {
    
          this.headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', session.getIdToken().getJwtToken());
        });

        if (education.city.length < 3) {
            educationForm.patchValue({'displayCities': false });
            this.listOfCities = [];
        }

        if (education.city.length >= 3 && education.country !== '') {      
            this.http.get(`${this.baseUrl}/doctor/core/reference/city?country_id=` + education.countryId +
              '&name=' + education.city, {headers: this.headers})
              .subscribe((cities) => {
                this.listOfCities = cities;
                educationForm.patchValue({'displayCities': true });
              });
        }
      }

      selectCity(city: any, educationForm: FormGroup) {
          educationForm.patchValue({'displayCities': false, 'city': city.name});
      }
    

}

class Education {
    university: any = ['', Validators.required];
    faculty: any = ['', Validators.required];
    graduated: any = ['', Validators.required];
    country: any = ['', Validators.required];
    countryId: number = 0;
    city: any = ['', Validators.required];
    displayCountries: boolean = false;
    displayCities: boolean = false;
}

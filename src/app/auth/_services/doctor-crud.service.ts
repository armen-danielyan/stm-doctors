import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CognitoUtil} from '../../service/cognito.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class DoctorCrudService {

  private baseUrl: string = environment.api.url;

  private headers;
  private headers_not_auth;
  profData;
  personalInfoData;
  educationInfo;
  careerData;
  attachData;
  itsOkUser;
  yearValueStr;
  show_waiting_time;
  public yearValue: any = [];

  constructor(private http: HttpClient,
              private cUtil: CognitoUtil) {
  }
  getYearWord(age){
    if(age == 11 || age == 12 || age == 13 || age == 14){
      return this.yearValueStr = 'лет';
    }
    else if(age == 1 || age % 10 == 1){
      return this.yearValueStr = 'год';
    }
    else if(age == 2 || age == 3 || age == 4 || age % 10 == 2 || age %10 == 3 || age % 10 == 4){
      return this.yearValueStr = 'годa';
    }
    else if(age == 5 || age == 6 || age == 7 || age == 8 || age == 9 || age % 10 == 0 || age % 10 == 5 || age % 10 == 6 || age % 10 == 7 || age % 10 == 8 || age % 10 == 9){
      return this.yearValueStr = 'лет';
    }
  }
  getTimer(sec) {

    const myTimer = setInterval(() => {
      if (sec > 0) {
        sec--;
        if (sec < 60) {
          this.show_waiting_time = sec + ' сек.';
        } else {
          this.show_waiting_time = Math.floor(sec / 60) + ' мин. ' + sec % 60 + ' сек.';
        }
      } else {
        clearInterval(myTimer);
      }
    }, 1000);
  }

  getToken() {
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }
      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
    });
  }


  getGenders() {
    this.getToken();
    return this.http.get<{ id: number; name: string }[]>(
      `${this.baseUrl}/doctor/profile/gender`,
      {headers: this.headers});
  }

  addDoctor(data) {
    this.getToken();
    return this.http.post(
      `${this.baseUrl}/doctor/profile/add`,
      data,
      {headers: this.headers});
  }

  addEducations(data) {
    this.getToken();
    return this.http.post(
      `${this.baseUrl}/doctor/profile/educations/add`,
      data,
      {headers: this.headers});
  }


  addCareers(data) {
    this.getToken();
    return this.http.post(
      `${this.baseUrl}/doctor/profile/works/add`,
      data,
      {headers: this.headers});
  }

  getSpecializations() {
    this.getToken();
    return this.http.get(
      `${this.baseUrl}/doctor/core/reference/specialization`,
      {headers: this.headers});
  }
  getSpecialities(id) {
    this.getToken();
    return this.http.get(`${this.baseUrl}/doctor/core/reference/specialty?specialization_id=${id}`,
    {headers: this.headers});
  }

  submitDoctorCategory(data) {
    this.getToken();

    return this.http.post(
      `${this.baseUrl}/doctor/core/doctor-info`,
      data,
      {headers: this.headers});
  }

  getServiceRules() {
    this.headers_not_auth = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}/common/static-page/service-rules`, {headers: this.headers_not_auth});
  }

  getPrivacyPolicy() {
    this.headers_not_auth = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}/common/static-page/privacy-policy`, {headers: this.headers_not_auth});
  }



  sendAgreement(data) {
    this.getToken();
    return this.http.post(
      `${this.baseUrl}/doctor/core/agreement/accept-service-rules`,
      data,
      {headers: this.headers});
  }

}





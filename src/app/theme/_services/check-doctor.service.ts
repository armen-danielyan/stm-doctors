import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CognitoUtil} from '../../service/cognito.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CheckDoctorService {

  private baseUrl: string = environment.api.url;
  private headers;

  constructor(private http: HttpClient,
              private cUtil: CognitoUtil) {
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


  checkDoctor() {
    this.getToken();
    return this.http.get(`${this.baseUrl}/doctor/profile/check`,
      {headers: this.headers});
  }

  // Doctor_Specialty() {
  //   const cognitoUser = this.cUtil.getCurrentUser();
  //   cognitoUser.getSession((err, session) => {
  //     if (err) {
  //       alert(err);
  //       return;
  //     }
  //     this.headers = new HttpHeaders().set('Content-Type', 'application/json')
  //       .set('Authorization', session.getIdToken().getJwtToken());
  //     console.log(session.getIdToken().getJwtToken());
  //   });
  //   return this.http.get(`${this.baseUrl}/doctor/reference/specialty`,
  //     {headers: this.headers});
  // }

  getPatient(id) {
    this.getToken();
    return this.http.get(`${this.baseUrl}/patient/profile/` + id,
      {headers: this.headers});
  }


}

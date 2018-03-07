import { Injectable } from '@angular/core';
import { CognitoUtil } from '../../service/cognito.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Route } from '../components/addmition/video-call-chat/video-end/video-end.component';
import { environment } from '../../../environments/environment';

@Injectable()
export class SpprServiceService {
  private baseUrl: string = environment.api.url;
  public headers;

  constructor(public cUtil: CognitoUtil, private http: HttpClient) {
  }

  /* get result search drugs */
  getDrugs(name) {
    const cognitoUser = this.cUtil.getCurrentUser();
    console.log(cognitoUser);
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }

      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken())
      console.log(session.getIdToken().getJwtToken());
    });
    console.log(this.headers);
    return this.http.get(`${this.baseUrl}/doctor/sppr/product/search?namePart=` + name, { headers: this.headers });
  }

  getMkb10(name) {

    const cognitoUser = this.cUtil.getCurrentUser();
    console.log(cognitoUser);
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }

      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken())
      console.log(session.getIdToken().getJwtToken());
    });
    console.log(this.headers);
    return this.http.get(`${this.baseUrl}/doctor/sppr/dict/mkb10?nameOrCode=` + name, { headers: this.headers });
  }


  SaveAdvise(data) {
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }

      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
      console.log(session.getIdToken().getJwtToken());
    });
    console.log(data);
    return this.http.post(`${this.baseUrl}/doctor/sppr/check/advise`, data, { headers: this.headers });
  }

  SaveEpicrisis(data) {
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }

      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
      console.log(session.getIdToken().getJwtToken());
    });
    return this.http.post<Epicris>(`${this.baseUrl}/doctor/core/epicrisis`, data, { headers: this.headers });
  }

  EpicrisCommit(id): Observable<Epicris> {
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }

      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
      console.log(session.getIdToken().getJwtToken());
    });
    return this.http.post<Epicris>(`${this.baseUrl}/doctor/core/epicrisis/` + id + '/commit', {}, { headers: this.headers })
  }

  getRoutes(): Observable<Route[]> {
    const cognitoUser = this.cUtil.getCurrentUser();
    cognitoUser.getSession((err, session) => {
      if (err) {
        alert(err);
        return;
      }

      this.headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', session.getIdToken().getJwtToken());
      console.log(session.getIdToken().getJwtToken());
    });

    return this.http.get<Route[]>(`${this.baseUrl}/doctor/sppr/dict/routes`, { headers: this.headers });
  }
}

export class Epicris {
  id: string;
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  marks: string;
  anamnesis: string;
  data: Date;
  conclusion: string;
  recommendation: string
  repeated_appointment: string;
  duration: number;
  diagnosis_mkb10: string[];
  medicinal: string[];
  complaint: string;
  doctor_note: string;
}

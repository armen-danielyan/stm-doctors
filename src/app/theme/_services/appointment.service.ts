import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CognitoUtil} from '../../service/cognito.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AppointmentService {

  private corUrl = `${environment.api.url}/doctor/`;
  private headers;
  selectedAppointment = new Subject<any>();

  constructor(private http: HttpClient,
              private cUtil: CognitoUtil) {
               }


  changeSelectedAppointment(data) {
    this.selectedAppointment.next(data);
  }
  getMessage(): Observable<any> {
    return this.selectedAppointment.asObservable();
  }
  getToken() {
    // alert('okk');
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

  getAppointments() {
    this.getToken();

    return this.http.get(this.corUrl + 'core/request',
      {headers: this.headers});
  }

  getAppointmentsProfile(appointmentsId) {
    this.getToken();
    return this.http.post(this.corUrl + 'profile/getpatients',
      appointmentsId,
      {headers: this.headers});
  }

  sendRequestId(id): any {
    this.getToken();
    return this.http.post(this.corUrl + 'core/appointment',
      {request_id: id},
      {headers: this.headers})
      .catch((error: any)=> { return Observable.of(error)});

  }

  startAppointment(id) {
    this.getToken();
    return this.http.get(this.corUrl + 'core/appointment/' + id + '/start',
      {headers: this.headers});
  }

  appointmentCancel(id) {
    this.getToken();
    return this.http.get(this.corUrl + 'core/appointment/' + id + '/cancel',
      {headers: this.headers});
  }

  appointmentFinish(id) {
    this.getToken();
    return this.http.get(this.corUrl + 'core/appointment/' + id + '/finish',
      {headers: this.headers});
  }

  checkAppointment(id: number): Observable<any> {
    this.getToken();
    return IntervalObservable
      .create(5000)
      .flatMap((i) => this.http.get<any>(this.corUrl + 'core/appointment/' + id,
      {headers: this.headers}))
  
  }

}



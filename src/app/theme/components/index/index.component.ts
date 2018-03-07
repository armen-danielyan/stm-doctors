import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentService} from '../../_services/appointment.service';
import {CognitoUtil} from '../../../service/cognito.service';
import {CheckDoctorService} from '../../_services/check-doctor.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DoctorCrudService} from '../../../auth/_services/doctor-crud.service';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  load = 'empty';
  profile_filled = false;
  profile_filled_id: number;
  information;
  dow = true;
  del = false;
  service_rules_html;
  // Img_patient;
  doctorData: any = {
    first_name: '',
    last_name: ''
  };
  Img_patient = [];
  yearValue: any = [];
  itsOkUser = false;
  appointments: any = [];
  secondAppointments: any = [];
  selectedAppointment: any;
  clearAppointment: any;
  emptyAppointment = true;
  selectedProfId;
  data;
  subscribe: Subscription;
  checkPhoto;
  private s3Params: any = environment.aws.s3;

  constructor(
    private appointmentService: AppointmentService,
    public cUtil: CognitoUtil,
    private http: HttpClient,
    private checkDoctorService: CheckDoctorService,
    private  router: Router,
    private doctorCrudService: DoctorCrudService
  ) {}

  ngOnInit() {
    this.subscribe = this.appointmentService.getMessage().subscribe(appointment => this.selectedAppointment = appointment)
    localStorage.removeItem('massageChat');
    // this.clearAppointment = setInterval(() => {   this.getAppointments(); }, 3000);
    this.getCategorInfo();
    this.getAppointments();
    this.getDoctorData();
    this.asd();
    this.doctorCrudService.attachData = localStorage.getItem('attachData');
  }

  changeI(data){
    this.appointmentService.changeSelectedAppointment(data);
  }
  ngOnDestroy() {
    window.clearInterval(this.clearAppointment);
    this.subscribe.unsubscribe();
  }

  onNavigate(appointment) {
    this.changeI(appointment);
    this.load = 'client-data';
  }

  getAppointments() {
    this.appointmentService.getAppointments()
    .subscribe(res => {
      const appointmentsId = {ids: []};
      if( Array.isArray(res) ) {
        res.map(appointment => {
          appointment.request_id = appointment.id;
          appointmentsId.ids.push(appointment.patient_id);
          appointment.requestTime = this.getTimeRequest(appointment.created_at);
        });

        _.uniqBy(res, el => el.id );
        console.log('appointmentService.getAppointments - data : \n', res);
      }

      this.appointments = [];
      this.doctorCrudService.yearValue = [];
      this.appointmentService.getAppointmentsProfile( appointmentsId )
      .subscribe( response => {
        if(Array.isArray(res) && Array.isArray(response)) {
          this.emptyAppointment = true;
          res.map(appointment => {
            response.map(patient => {
              if (appointment.patient_id === patient.sub) {
                patient.age = this.getAge(patient.birth_date);
                this.appointments.push(Object.assign(appointment, patient));
                this.Img_patient.push(`https://s3.${this.s3Params.user.region}.amazonaws.com/${this.s3Params.user.bucket}/` +
                  this.appointments[0].patient_id + '/' + 'avatar.jpeg');
                this.doctorCrudService.getYearWord(appointment.age);
                this.doctorCrudService.yearValue.push(this.doctorCrudService.yearValueStr);
                appointment.yearValue = this.doctorCrudService.yearValueStr;
              }
            });

            _.uniqBy(response, el => el.id );
            console.log('appointmentService.getAppointmentsProfile - data : \n', response);

            this.emptyAppointment = false;
          });
        }
      });
    });
  }

  ngAfterViewInit() {
    this.clearAppointment = setInterval(() => {
      this.secondAppointments = [];
      this.appointmentService.getAppointments()
      .subscribe(res => {
        const appointmentsId = {ids: []};
        if (Array.isArray(res)) {
          res.map(appointment => {
            appointment.request_id = appointment.id;
            appointmentsId.ids.push(appointment.patient_id);
            appointment.requestTime = this.getTimeRequest(appointment.created_at);
          });

          _.uniqBy(res, el => el.id );
        }
        this.appointmentService
        .getAppointmentsProfile(appointmentsId).subscribe(response => {
          if (Array.isArray(res) && Array.isArray(response)) {
            this.appointments = [];
            this.emptyAppointment = true;
            res.map(appointment => {
              response.map(patient => {
                if (appointment.patient_id === patient.sub) {
                  patient.age = this.getAge(patient.birth_date);
                  this.secondAppointments.push(Object.assign(appointment, patient));
                  this.Img_patient.push(`https://s3.${this.s3Params.user.region}.amazonaws.com/${this.s3Params.user.bucket}/` +
                    this.secondAppointments[0].patient_id + '/' + 'avatar.jpeg');
                  this.appointments = this.secondAppointments;
                  this.doctorCrudService.getYearWord(appointment.age);
                  this.doctorCrudService.yearValue.push(this.doctorCrudService.yearValueStr);
                  appointment.yearValue = this.doctorCrudService.yearValueStr;
                }
              });

              _.uniqBy(response, el => el.id );

              this.emptyAppointment = false;
            });
          }
        });
      });
      // this.getAppointments();
    }, 10000);
  }


  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  getTimeRequest(time) {
    const ghg = time * 1000;
    const dateObj = new Date(ghg);
    let month: any = dateObj.getUTCMonth() + 1; // months from 1-12
    let day: any = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    let minute: any = dateObj.getMinutes();
    let hour: any = dateObj.getHours();
    /* if (month < 10) {
       month = '0' + month;
     }
     if (day < 10) {
       day = '0' + day;
     }
     if (hour < 10) {
       hour = '0' + hour;
     }
     if (minute < 10) {
       minute = '0' + minute;
     }*/
    month < 10 && (month = '0' + month);
    day < 10 && (day = '0' + day);
    hour < 10 && (hour = '0' + hour);
    minute < 10 && (minute = '0' + minute);
    return day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
  }

  getDoctorData() {
    this.checkDoctorService.checkDoctor().subscribe(res => {
      this.doctorData = res;
      if (res['message'] === 'Profile is not set on DB') {
        this.router.navigate(['./registration-proffesion']);
        // alert('okokokok');
      } else if (this.doctorData.education.length == 0) {
        this.router.navigate(['./registration-education']);
      } else if (this.doctorData.work.length == 0) {
        this.router.navigate(['./registration-career']);
      }
      //  else if (this.doctorCrudService.attachData !== 'true') {
      //   this.router.navigate(['./attach-file']);
      // }

    });
  }

  getCategorInfo() {
    this.data = {
      'specialty_id': this.selectedProfId
    };
    this.doctorCrudService.submitDoctorCategory(this.data).subscribe(response => {
    }, dump => {
      if (dump['error'].message == 'Something went wrong') {
        // this.router.navigate(['./registration-proffesion']);
      }
    });
  }

  asd() {
    this.http.get(`https://s3.${this.s3Params.provider.region}.amazonaws.com/${this.s3Params.provider.bucket}/` +
      this.cUtil.getCurrentUser().getUsername() + '/docs/passport/passport.jpeg').subscribe(response => {
      },
      error => {
        this.checkPhoto = error.status;
        if (error.status != 200) {
          this.router.navigate(['./attach-file']);
        }
      });
  }

}

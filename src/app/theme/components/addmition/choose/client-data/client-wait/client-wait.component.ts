import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Router} from '@angular/router';
import {AppointmentService} from '../../../../../_services/appointment.service';
import {DoctorCrudService} from '../../../../../../auth/_services/doctor-crud.service';
import { ModalDialogComponent } from '../../../../modal-component/modal-component';

@Component({
  selector: 'app-client-wait',
  templateUrl: './client-wait.component.html',
  styleUrls: ['./client-wait.component.scss']
})
export class ClientWaitComponent implements OnInit {
  @Input() appointment: any;
  @Output() client = new EventEmitter();
  count_resend: number;
  timeOut;
  alergies = [];
  disease = [];
  waiting_time;
  show_waiting_time;
  yearValue;
  day;
  month;
  data_patient;
  isAppointmentPresents: boolean = false;

  connect: any;
  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private doctorCrudService: DoctorCrudService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {   
    localStorage.setItem('appointment', JSON.stringify(this.appointment));
    const d = new Date(this.appointment.birth_date);
    this.day = (d.getDate() <= 9) ? '0' + d.getDate() : d.getDate();
    this.month = d.getMonth() + 1;
    this.month = (d.getMonth() <= 9) ? '0' + this.month : this.month;
    this.data_patient = this.day + '.' + this.month + '.' + d.getFullYear();
    this.alergies = JSON.parse(this.appointment['allergies']);
    this.disease = JSON.parse(this.appointment['chronic_diseases']);
    this.sendRequestId();
    this.yearValue = this.doctorCrudService.yearValue;
  }


  cancelSelectedAppointment() {
    let dialogRef = this.dialog.open(ModalDialogComponent,
      {
        position: { top: '140px'},
        role: 'dialog',
        data: { 
          title: 'Отмена приема',
          text: 'Вы уверены, что хотите отменить прием?',
          confirmed: 0
         }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
        
        if (result) {
          this.goToClientData();
        }

      });
  }


  goToClientData() {
    this.appointmentCancel();
    this.client.emit('client-data');
    this.appointmentService.changeSelectedAppointment(null);
  }

  sendRequestId() {
    // this.appointment.request_id = this.appointment.request_id.toString();
    this.appointmentService.sendRequestId(this.appointment.request_id).subscribe(res => {
      console.log('**** send request id');
      let dialogRef: any;
      if (res.error) {
        let errorMessage = res.error.message || res.error[0].message;

        if (errorMessage == 'There is no request with such id') {
          dialogRef = this.dialog.open(ModalDialogComponent,
            {
              position: { top: '140px'},
              role: 'alertdialog',
              data: { 
                title: 'Произошла ошибка',
                text: 'Заявка отменена пациентом'
               }
            });
        }

        if (errorMessage == 'This request was already taken') {
          dialogRef = this.dialog.open(ModalDialogComponent,
            {
              position: { top: '140px'},
              role: 'alertdialog',
              data: { 
                title: 'Произошла ошибка',
                text: 'Заявка уже обрабатывается другим специалистом'
               }
            });
        }

        dialogRef.afterClosed().subscribe(result => {
          this.client.emit('client-data');
          this.appointmentService.changeSelectedAppointment(null);
          return;
        });
        
      } else {
        this.appointment.appointment_id = res['id'];
        localStorage.setItem('appointment', JSON.stringify(this.appointment));
        this.isAppointmentPresents = true;
        this.callStartTime(res);
      }  
    });
  }

  callStartTime(appointment) {
    console.log('**************  appointment');
    console.log(this.appointment);
    this.waiting_time = appointment.estimated_meeting_start_countdown;
    this.getTimer(this.waiting_time);
    console.log('**************  this.count_resend');
    console.log(this.waiting_time);
    this.connect = this.appointmentService.checkAppointment(appointment.id).subscribe(data => {
      if (data.status === 'cancelled by patient') {
        clearTimeout(this.timeOut);
        this.connect.unsubscribe();
        let dialogRef = this.dialog.open(ModalDialogComponent,
          {
            position: { top: '140px'},
            role: 'alertdialog',
            data: { 
              title: 'Произошла ошибка',
              text: 'Заявка отменена пациентом'
             }
          });
        dialogRef.afterClosed().subscribe(result => {
          this.client.emit('client-data');
          
          this.appointmentService.changeSelectedAppointment(null);
          return;
        });
      }
    })

    const that = this;
    this.timeOut = setTimeout(
      () => {
        that.startAppointment();
      },
      appointment.estimated_meeting_start_countdown
      * 1000
    );
  }

  startAppointment() {
    this.appointmentService.startAppointment(
      this.appointment.appointment_id
    )
    .subscribe(res => {
      console.log('****** start appointment');
      console.log(res);
      this.router.navigate(['/video-call-chat'], {queryParams: {room: this.appointment.appointment_id}});
    });
  }


  appointmentCancel() {
    this.appointmentService.appointmentCancel(this.appointment.appointment_id).subscribe(res => {
      clearTimeout(this.timeOut);
      this.client.emit('client-data');
    });
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

}


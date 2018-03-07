import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CheckDoctorService} from '../../../../_services/check-doctor.service';
import {DoctorCrudService} from '../../../../../auth/_services/doctor-crud.service';


@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit {
  @Input() appointment: any;
  @Input() clearAppointment: any;
  load = 'client-data';
  alergies = [];
  disease = [];
  data_patient;
  yearValue: any = [];
  yearValueStr;
  day;
  month;


  constructor(public checkDoctorService: CheckDoctorService,
              public  doctorCrudService: DoctorCrudService,
              private router: Router) {
  }


  ngOnInit() {
    // window.clearInterval(this.clearAppointment);
    const d = new Date(this.appointment.birth_date);
    console.log(d.getDate()); // Hours
    console.log(d.getFullYear());
    console.log(d.getMonth());
    this.data_patient = this.appointment.birth_date.split('T')[0];
    this.day = (d.getDate() <= 9) ? '0' + d.getDate() : d.getDate();
    this.month = d.getMonth() + 1;
    this.month = (d.getMonth() <= 9) ? '0' + this.month : this.month;
    this.data_patient = this.day + '.' + this.month + '.' + d.getFullYear();
    localStorage.setItem('appointment', JSON.stringify(this.appointment));
    this.alergies = JSON.parse(this.appointment['allergies']);
    this.disease = JSON.parse(this.appointment['chronic_diseases']);
    console.log(this.alergies);
    this.yearValue = this.doctorCrudService.yearValue;
  }


  navigate(route: string) {
    console.log(this.appointment);
    this.load = route;
  }
}

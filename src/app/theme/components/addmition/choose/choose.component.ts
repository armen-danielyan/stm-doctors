import {Component,  OnInit, } from '@angular/core';
import {AppointmentService} from '../../../_services/appointment.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss']
})
export class ChooseComponent implements OnInit {
  load = 'empty';

  constructor(private appointmentService: AppointmentService) { }


  ngOnInit() {
    this.getAppointments();
  }

  onNavigate() {
    this.load = 'client-data';
  }


  getAppointments() {
    this.appointmentService.getAppointments().subscribe(res => {
      console.log(res);
    });
  }

}

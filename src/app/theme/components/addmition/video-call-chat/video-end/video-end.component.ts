import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpprServiceService} from '../../../../_services/sppr-service.service';
import {SwitcherService} from '../../../../_services/switcher.service';
import {CheckDoctorService} from '../../../../_services/check-doctor.service';
import {Router} from '@angular/router';
import {DoctorCrudService} from '../../../../../auth/_services/doctor-crud.service';

@Component({
  selector: 'app-video-end',
  templateUrl: './video-end.component.html',
  styleUrls: ['./video-end.component.scss']
})
export class VideoEndComponent implements OnInit, OnDestroy {
  show_elective_medicines = false;
  show_drugs = 'none';
  selected_drugs_all = [];
  drugs = [];
  valuesDrugs = '';
  elective_medicines = [];
  reg = `([0-9]{1,2}:[0-9]{1,2})`;
  show_Mkb10 = 'none';
  select_Mkb10_all = [];
  Mkb10 = [];
  Mkd10_show_selets = [];
  show_mkd10_show_selets = false;
  valuMekb10 = '';
  appointment;
  data_patient;
  chatmessageChat;
  modale_true = false;
  modale_false = true;
  yearValue;
  loader = true;
  docName;
  day;
  month;

  chatmessage = ``;
  anamnesis = '';
  objective_data = '';
  diagnosis = '';
  recommendations = '';
  notes = '';

  WarningsMessage = [];
  ErrorMediticl = [];

  data = {
    'medicalAllergy': [],
    'nozology': [
      {
        'mkd10code': 'RO5',
        'lsExtended': false
      }
    ],
    'patient': {
      'age': 22,
      'sex': 'man',
      'weight': 65,
      'states': ['hepato']
    },
    'products': [
      {
        'id': {
          'kind': 'addadada',
          'name': '12354'
        },
        'name': 'adadugdahgdah'
      }
    ]
  };

  Epicrisis_Data = {
    'appointment_id': 1,
    'marks': 'Some text',
    'anamnesis': 'Some text',
    'data': 'Some text',
    'diagnosis_mkb10': [],
    'conclusion': 'Some text',
    'recommendation': 'Some text',
    'medicinal': [],
    'doctor_note': 'Some text'
  };

  MKB_10_ERROR = false;
  elective_medicines_ERROR = false;


  defaultRoute = 'Выберите способ приема';
  isRoutesOpened: boolean = false;

  newDrugs: Drugs = new Drugs(new ID('', ''), '', '');

  routes: Route[];
  doctorData: any;


  constructor(public sppr: SpprServiceService,
              private switcherService: SwitcherService,
              private checkDoctorService: CheckDoctorService,
              private doctorCrudService: DoctorCrudService,
              private router: Router) {
  }

  ngOnInit() {
    this.getDoctorData();
    this.appointment = JSON.parse(localStorage.getItem('appointment'));
    const d = new Date(this.appointment.birth_date);
    console.log(this.appointment.appointment_id);
    this.data_patient = this.appointment.birth_date.split('T')[0];
    this.day = (d.getDate() <= 9) ? '0' + d.getDate() : d.getDate();
    this.month = d.getMonth() + 1;
    this.month = (d.getMonth() <= 9) ? '0' + this.month : this.month;
    this.data_patient = this.day + '.' + this.month + '.' + d.getFullYear();
    this.yearValue = this.doctorCrudService.yearValue;
    this.chatmessageChat = localStorage.getItem('massageChat');
    this.docName = localStorage.getItem('docName');
    this.chatmessageChat = this.chatmessageChat.split(`${this.docName}`).join(`<p><br></p><p>${this.docName}</p>`)
      .split(`${this.appointment.first_name} ${this.appointment.last_name}`)
      .join(`<p><br></p><p>${this.appointment.first_name} ${this.appointment.last_name}</p>`);
    this.sppr.getRoutes().subscribe(routes => {
      this.routes = routes;
    });
  }

  getDoctorData() {
    this.checkDoctorService.checkDoctor().subscribe(res => {
      console.log('**** doctor data');
      console.log(res);
      this.doctorData = res;
      // this.switcherService.chatmessage.subscribe(chatMessate => {
      //   this.chatmessage = chatMessate.split(`${this.appointment.first_name} ${this.appointment.last_name}`)
      //     .join(`<p><br></p><p>${this.appointment.first_name} ${this.appointment.last_name}</p>`)
      //     .split(res['last_name'] + ' ' + res['first_name'])
      //     .join('<p><br></p><p>' + ' ' + res['last_name'] + ' ' + res['first_name'] + ' ' + '</p>');
      //   this.chatmessage.split(`${this.reg}`).join('TIME');
      //   console.log(this.chatmessage);
      // });
      // this.chatmessageChat = localStorage.getItem('massageChat');
      // this.chatmessageChat = this.chatmessageChat.split(`${this.appointment.first_name} ${this.appointment.last_name}`)
      //   .join(`<p><br></p><p>${this.appointment.first_name} ${this.appointment.last_name}</p>`)
      //   .split(res['last_name'] + ' ' + res['first_name'])
      //   .join('<p><br></p><p>' + ' ' + res['last_name'] + ' ' + res['first_name'] + ' ' + '</p>');
      this.chatmessageChat = localStorage.getItem('massageChat');
      this.docName = localStorage.getItem('docName');
      this.chatmessageChat = this.chatmessageChat.split(`${this.docName}`).join(`<p><br></p><p>${this.docName}</p>`)
        .split(`${this.appointment.first_name} ${this.appointment.last_name}`)
        .join(`<p><br></p><p>${this.appointment.first_name} ${this.appointment.last_name}</p>`);
      console.log(this.chatmessageChat);
    });
  }


  ngOnDestroy() {
    localStorage.removeItem('appointment');
  }


  searchDrugs(name) {
    if (name.length >= 3) {
      this.loader = false;
      // if (res instanceof Array) {
      console.log(name);
      this.sppr.getDrugs(name).subscribe(res => {
        console.log(res);
        this.loader = true;
        if (res instanceof Array) {
          this.selected_drugs_all = res.map(value => {
            return value;
          });
          this.show_drugs = 'block';
          this.drugs = this.selected_drugs_all;
        }
        console.log(this.drugs);
      });
    }
  }

  searchMkb10(name) {
    if (name.length >= 3) {
      this.loader = false;
      // if (res instanceof Array) {
      console.log(name);
      this.sppr.getMkb10(name).subscribe(res => {
        console.log(res);
        this.loader = true;
        if (res instanceof Array) {
          this.select_Mkb10_all = res.map(value => {
            return value;
          });
          this.show_Mkb10 = 'block';
          this.Mkb10 = this.select_Mkb10_all;
        }
        console.log(this.Mkb10);
      });
    }
  }

  selectDrugs(drugs) {
    this.show_drugs = 'none';
    this.valuesDrugs = drugs.name;
    this.newDrugs.id = drugs.id;
    this.newDrugs.name = drugs.name;
    console.log(this.newDrugs);
    this.elective_medicines_ERROR = false;
  }

  manipulateRoutesDropdown() {
    this.isRoutesOpened = !this.isRoutesOpened;
  }

  addDrugs(route) {
    console.log(this.routes);
    this.newDrugs.Route = route.id;

    for (let i = 0; i < this.elective_medicines.length; i++) {
      const element = this.elective_medicines[i];
      if (element.name == this.newDrugs.name) {
        this.valuesDrugs = '';
        return;
      }
    }
    if (!this.newDrugs.name) {
      this.elective_medicines_ERROR = true;
    }

    if (this.newDrugs.name && this.newDrugs.Route) {
      this.elective_medicines.push(this.newDrugs);
      this.show_elective_medicines = true;
      this.valuesDrugs = '';
      this.newDrugs = new Drugs(new ID('', ''), '', '');
    }
    this.isRoutesOpened = !this.isRoutesOpened;
  }

  ShowDrugs() {
    this.show_drugs = 'block';
  }

  DeleteElective_medicines(index) {
    console.log(index);
    this.elective_medicines.splice(index, 1);
  }

  onSubmitData() {
    const PatientAlllergy = [];
    const medicalAllergy = JSON.parse(this.appointment.allergies);
    const PatientData = this.appointment;
    const PatientStates = JSON.parse(this.appointment.chronic_diseases);
    const PatientStatusName = [];
    const Nozolgy = [];


    console.log(this.Mkd10_show_selets);
    for (const Mkd10 of this.Mkd10_show_selets) {
      // console.log(Mkd10.pcode);
      Nozolgy.push({

        'mkb10code': Mkd10.pcode,
        'isExtended': false
      });
    }


    for (const allergy of medicalAllergy) {
      PatientAlllergy.push(allergy.id);
    }
    for (const states of PatientStates) {
      PatientStatusName.push(states.id);
    }
    this.data['medicalAllergy'] = PatientAlllergy;

    if (PatientData.gender_id === 1) {
      PatientData.gender_id = 'man';
    } else {
      PatientData.gender_id = 'woman';
    }

    this.data['patient'].age = PatientData.age;
    this.data['patient'].sex = PatientData.gender_id;
    this.data['patient'].weight = PatientData.weight;
    this.data['patient'].states = PatientStatusName;
    this.data['products'] = this.elective_medicines;
    this.data['nozology'] = Nozolgy;

    console.log(this.data);

    //
    this.sppr.SaveAdvise(this.data).subscribe(res => {
      if (res['warnings'] !== []) {
        this.WarningsMessage = [];
        for (const warnings of res['warnings']) {
          this.WarningsMessage.push(warnings);
          this.ErrorMediticl.push(warnings);
        }

        for (const thiswarnings of this.ErrorMediticl) {

          const a = thiswarnings.Classification.toUpperCase();
          console.log(a);
          if (a.indexOf('NOZOLOGY') !== -1) {
            this.MKB_10_ERROR = true;
          }
          if (a.indexOf('PRODUCT') !== -1) {
            this.elective_medicines_ERROR = true;
          }
        }
      }
    });

  }

  saveEpicrisis() {
    // alert('ok');
    // console.log(this.appointment.appointment_id);
    // console.log(this.chatmessageChat);
    // console.log(this.anamnesis);
    // console.log(this.objective_data);
    // console.log(this.diagnosis);
    // console.log(this.recommendations);
    // console.log(this.notes);
    // console.log('------------------- diagnosis_mkb10');
    // console.log(this.Mkd10_show_selets);
    // console.log('------------------- medicinal');
    // console.log(this.elective_medicines);

    this.Epicrisis_Data.appointment_id = this.appointment.appointment_id;
    // this.Epicrisis_Data.marks = this.chatmessage;
    this.Epicrisis_Data.marks = this.chatmessageChat;
    this.Epicrisis_Data.anamnesis = this.anamnesis;
    this.Epicrisis_Data.data = this.objective_data;
    this.Epicrisis_Data.diagnosis_mkb10 = this.Mkd10_show_selets;
    this.Epicrisis_Data.medicinal = this.elective_medicines;
    this.Epicrisis_Data.recommendation = this.recommendations;
    this.Epicrisis_Data.doctor_note = this.notes;
    this.Epicrisis_Data.conclusion = this.diagnosis;


    console.log(this.Epicrisis_Data);

    // console.log('------------------- medicinal');
    // console.log(this.elective_medicines);
    // console.log('------------------- diagnosis_mkb10');
    // console.log(this.Mkd10_show_selets);
    // this.Epicrisis_Data.
    this.sppr.SaveEpicrisis(this.Epicrisis_Data).subscribe(epicris => {
        this.sppr.EpicrisCommit(epicris.id).subscribe(epicris => console.log('ok'));
        document.getElementById('cloase').click();
        this.router.navigate(['./index']);
        // location.reload();
      },
      error => {
        console.log(error);
      });

  }


  addMkd10(m) {
    this.show_Mkb10 = 'none';
    this.valuMekb10 = '';
    this.Mkd10_show_selets.push(m);
    this.show_mkd10_show_selets = true;
  }

  Modale_True($event) {
    console.log($event.target.checked);
    if ($event.target.checked) {
      this.modale_true = true;
      this.modale_false = false;
    } else {
      this.modale_true = false;
      this.modale_false = true;
    }
  }

  Delete_Mkd10_show_selets(index) {
    this.Mkd10_show_selets.splice(index, 1);
  }

}

export class Route {
  constructor(public id: string, public name: string) {
  }
}

export class Drugs {
  constructor(public id: ID,
              public name: string = '',
              public Route: string = '') {
  }
}

export class ID {
  constructor(public kind: string,
              public name: string) {
  }
}

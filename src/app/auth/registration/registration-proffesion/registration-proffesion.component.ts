import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DoctorCrudService} from '../../_services/doctor-crud.service';
import {error} from 'util';
import {CheckDoctorService} from '../../../theme/_services/check-doctor.service';
import {ClickoutsideService} from '../../_services/clickoutside.service';

@Component({
  selector: 'app-registration-profession',
  templateUrl: './registration-proffesion.component.html',
  styleUrls: ['./registration-proffesion.component.scss'],
  providers: [ClickoutsideService]
})
export class RegistrationProffesionComponent implements OnInit {
  default_profession = 'Профессия';
  default_category = 'Категория';
  profileDisabled = false;
  proffesion;
  selectedProfId;
  selectedCategorId;
  category;
  data;
  fValid_1: boolean = true;
  fValid_2: boolean = true;
  profData: false;
  doctorData;
  isOpenCat = false;
  isOpenProf = false;

  constructor(private router: Router,
              private doctorCrudService: DoctorCrudService,
              private  checkDoctorService: CheckDoctorService,
              private clickoutsideService: ClickoutsideService) {
  }


  isOpenedCategor() {
    this.isOpenCat = !this.isOpenCat;
    this.isOpenProf = false;
  }

  isOpenedProf() {
    this.isOpenProf = !this.isOpenProf;
    this.isOpenCat = false;
  }

  onSelectProf(name) {
    this.default_profession = name.caption_key;
    this.selectedProfId = name.id;
    this.isOpenProf = false;
    this.fValid_1 = false;
    console.log(this.selectedProfId);
  }

  onSelectSpecialization(name) {
    this.default_category = name.caption_key;
    this.selectedCategorId = name.id;
    this.isOpenCat = false;
    this.fValid_2 = false;
    console.log(this.selectedCategorId);
    this.doctorCrudService.getSpecialities(this.selectedCategorId).subscribe(response => {
      this.profileDisabled = true;
      this.proffesion = response;
      console.log(response);
    });
  }

  ngOnInit() {
    this.doctorCrudService.getSpecializations().subscribe(response => {
      this.profileDisabled = true;
      this.category = response;
      console.log(response);
    });
    // this.getCategorInfo();
    // this.getDoctorData();
  }

  onSubmit() {
    this.data = {
      // 'rank_id': this.selectedCategorId,
      'specialty_id': this.selectedProfId
    };
    this.doctorCrudService.submitDoctorCategory(this.data).subscribe(response => {
      console.log(response);
      console.log(response['error']);
      this.router.navigate(['./registration-personal-info']);

    }, dump => {
      if (dump.error.message == 'You already set your information before') {
        this.router.navigate(['./registration-personal-info']);
      }
      console.log(dump.error.message);
    });
  }

  clickOut() {
    this.clickoutsideService.onClickedOutside(event);
    this.isOpenProf = this.clickoutsideService.isOpen;
    this.isOpenCat = this.clickoutsideService.isOpen;
  }

  // getDoctorData() {
  //   this.checkDoctorService.checkDoctor().subscribe(res => {
  //     console.log('**** doctor data');
  //     console.log(res);
  //     this.doctorData = res;
  //     if (res['id']) {
  //       // this.router.navigate(['./index']);
  //       // alert('okokokok');
  //     }
  //   });
  // }

  // getCategorInfo() {
  //   this.data = {
  //     'specialty_id': this.selectedProfId
  //   };
  //   this.doctorCrudService.submitDoctorCategory(this.data).subscribe(response => {
  //      console.log(response);
  //   }, dump => {
  //     console.log(dump);
  //     // console.log(dump);
  //     if (dump['error'].message !== 'Something went wrong') {
  //        // this.router.navigate(['./index']);
  //     }
  //   });
  // }
}

import {Component, OnChanges, OnInit} from '@angular/core';
import {AttachService} from '../../_services/attach.service';
import {Router} from '@angular/router';
import {DoctorCrudService} from '../../_services/doctor-crud.service';


@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})
export class AttachFileComponent implements OnInit, OnChanges {

  passportUploads = [];
  diplomUploads = [];
  additionalDocs = [];
  buttonSwitcher = true;
  fixed;
  attachData = false;

  constructor(private attachService: AttachService,
              private router: Router,
              private doctorCrudService: DoctorCrudService) {
  }

  ngOnInit() {
    if (localStorage.getItem('attachData') == 'true') {
       this.router.navigate(['./index']);
    }
  }

  ngOnChanges() {
    this.chechFiles();
    console.log('change');
  }

  chechFiles() {
    if ((this.passportUploads.length > 0)) {
      this.buttonSwitcher = false;
    }
  }

  passportUpload(event) {
    console.log('Image url in component');
    this.attachService.createPhoto(event.target.files[0].name, event.target.files[0], 'passport', (data) => {
      console.log(data);
      this.uploadFilesLogic(event, this.passportUploads, data);
      this.chechFiles();
      console.log(this.buttonSwitcher);
    });
  }

  diplomUpload(event) {
    this.attachService.createPhoto(event.target.files[0].name, event.target.files[0], 'diploma', (data) => {
      console.log(data);
      this.uploadFilesLogic(event, this.diplomUploads, data);
      this.chechFiles();
      console.log(this.buttonSwitcher);
    });

  }

  additionalUpload(event) {
    this.attachService.createPhoto(event.target.files[0].name, event.target.files[0], 'additional', (data) => {
      console.log(data);
      this.uploadFilesLogic(event, this.additionalDocs, data);
      this.chechFiles();
      console.log(this.buttonSwitcher);
    });

  }

  removeUploaded(index: number, text: string, imageKey: string) {
    console.log(imageKey);
    console.log(index);
    if (index == 0) {
      this.buttonSwitcher = true;
    }
    this.attachService.deletePhoto(imageKey, data => {
      text === 'passport' && this.passportUploads.splice(index, 1);
      text === 'diploma' && this.diplomUploads.splice(index, 1);
      text === 'additional' && this.additionalDocs.splice(index, 1);
      this.chechFiles();
      console.log(this.buttonSwitcher);
    });


  }

  uploadFilesLogic(event, uploads, data) {
    console.log(event.target.files);
    let size = event.target.files[0].size;
    let sizeOnBites = '';

    size > 8388608 ? size = size / 8 / 1024 / 1024 : size = size / 8 / 1024;
    size > 8388608 ? sizeOnBites = 'MB' : sizeOnBites = 'KB';
    size = size.toFixed(2);

    const dateObj = new Date();
    let month: any = dateObj.getUTCMonth() + 1; // months from 1-12
    let day: any = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const hours = dateObj.getHours();
    const min = dateObj.getMinutes();

    day < 10 && (day = '0' + day);
    month < 10 && (month = '0' + month);
    //  - ${hours}:${min}
    const time = `${day}.${month}.${year}`;
    let format = event.target.files[0].name.split('.');
    format = format[1].toUpperCase();

    let uploadObj = {
      name: event.target.files[0].name,
      time: time,
      size: size,
      format: format,
      sizeOnBites: sizeOnBites,
      imageUrl: data.Location,
      imageKey: data.key
    };
    uploads.push(uploadObj);
    uploadObj = null;
  }

  goNext() {
    localStorage.setItem('attachData', 'true');
    this.router.navigate(['./index']);
  }
}


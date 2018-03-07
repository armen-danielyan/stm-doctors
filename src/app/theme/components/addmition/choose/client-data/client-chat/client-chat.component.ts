import {
  AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnDestroy, OnInit, ViewChild,
  ViewChildren
} from '@angular/core';
import {ScriptLoaderService} from '../../../../../../service/script-loader.service';
import {ChatService} from '../../../../../../service/chat.service';
import {ChatCallback, CognitoUtil} from '../../../../../../service/cognito.service';
import {SwitcherService} from '../../../../../_services/switcher.service';
import {CheckDoctorService} from '../../../../../_services/check-doctor.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.scss']
})
export class ClientChatComponent implements OnInit, ChatCallback, AfterViewInit, OnDestroy {
  @Input() loader: string;
  @ViewChild('messageList') messageList: ElementRef;
  errorColor = '';
  fileurl = '';
  fixed;
  inProgress = false;
  imgPrev = false;
  chatImg = [];
  filePath = '';
  show_file = 'none';
  enter_my = false;
  pathimg = '';
  doctor_info = ''
  alergies = [];
  disease = [];
  appointment;
  data_patient;
  patinet_Img;
  Patient_Info ;
  day;
  month;
  private s3Params: any = environment.aws.s3;

  constructor(private _script: ScriptLoaderService,
              public upload: ChatService,
              private switcherService: SwitcherService,
              public cUtil: CognitoUtil,
              private checkDoctorService: CheckDoctorService,) {

  }

  ngOnInit() {
    // alert("ok");
    this.appointment = JSON.parse(localStorage.getItem('appointment'));
    console.log(this.appointment.birth_date.split("T")[0]);
    this.data_patient = this.appointment.birth_date.split("T")[0]
    const d = new Date(this.appointment.birth_date);
    this.day = (d.getDate() <= 9) ? '0' + d.getDate() : d.getDate();
    this.month = d.getMonth() + 1;
    this.month = (d.getMonth() <= 9) ? '0' + this.month : this.month;
    this.data_patient = this.day + '.' + this.month + '.' + d.getFullYear();
    console.log(this.appointment.patient_id);
    this.patinet_Img = `https://s3.${this.s3Params.user.region}.amazonaws.com/${this.s3Params.user.bucket}/` +
      this.appointment.patient_id  + '/' + 'avatar.jpeg';
    this.Patient_Info = this.appointment.first_name + ' ' + this.appointment.last_name;
    console.log(this.Patient_Info);
    this.alergies = JSON.parse(this.appointment['allergies']);
    this.disease = JSON.parse(this.appointment['chronic_diseases']);


    this.checkDoctorService.checkDoctor().subscribe(res => {
      console.log('**** doctor data*************************************************************');
      this.doctor_info = res['last_name'] + ' ' + res['first_name'];
      console.log(this.doctor_info);
    });
    console.log('Uploaded :: ' + this.fixed);
    this.pathimg = `https://s3.${this.s3Params.provider.region}.amazonaws.com/${this.s3Params.provider.bucket}/` +
      this.cUtil.getCurrentUser().getUsername() + '/' + 'avatar.jpeg';
    console.log('IMAGE*******************');
    console.log(this.pathimg);
  }

  prev() {
    this.imgPrev = !this.imgPrev;
    console.log(this.imgPrev);
  }


  styleMethod() {
    return {
      color: this.errorColor,
    };
  }

  ngAfterViewInit() {
    console.log(123456);
  }


  ngOnDestroy() {
    console.log(this.messageList);
    console.log(this.messageList.nativeElement.outerHTML);

    console.log(this.messageList.nativeElement.textContent);
    this.switcherService.addChatMessageMethod(this.messageList.nativeElement.textContent);
    localStorage.setItem('massageChat', this.messageList.nativeElement.textContent);
    localStorage.setItem('docName', this.doctor_info);
  }

  FileUpload(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        // console.log(event.target.result);
        //   // console.log(this.url);
      };
      // console.log(event.target.files[0]);
      // reader.readAsDataURL(event.target.files[0]);
      // this.url = '';
      this.upload.fileUploadChat(event.target.files[0].name, event.target.files[0], this, done => {
        console.log(done);
        this.inProgress = true;
        this.fixed = done;
      });
      // console.log(reader);
    }
    // console.log(event.target.files[0].name);
    console.log('Uploaded :: ' + this.fixed);
  }


  DelClass() {
    this.enter_my = false;
  }


  ChatCallback(data: string, result: any) {
    if (data) {
      this.switcherService.imageURL.next(data);
      this.show_file = 'block';
      // this.fileurl = data;
      this.filePath = data;
      setTimeout(() => {
        this.inProgress = false;
        this.enter_my = true;
        document.getElementById('myfile').style.visibility = 'visible';
        document.getElementById('myfile').style.display = 'block';
      }, 0);
      // document.getElementById('MessageInputButton').click();
    }
  }

  DelFile() {
    this.filePath = '';
    document.getElementById('myfile').classList.remove('enter_my');
    document.getElementById('myfile').style.visibility = 'hidden';
    // document.getElementsByClassName('show_file')[0].style.display = 'none';

  }


}

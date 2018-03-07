import {
  AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild
} from '@angular/core'
import { ScriptLoaderService } from '../../../../service/script-loader.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { VideoChatService } from '../../../../service/video-chat.service'
import { ChatService } from '../../../../service/chat.service'
import { ChatCallback } from '../../../../service/cognito.service'
import { SwitcherService } from '../../../_services/switcher.service'
import { AppointmentService } from '../../../_services/appointment.service'
import { PlatformLocation } from '@angular/common'
import { SkylinkService } from '../../../_services/skylink.service'
import { ICanDeactivateComponent } from '../../../../shared/guards/can-deactivate-dialog.guard'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { ModalDialogComponent } from '../../modal-component/modal-component'

@Component({
  selector: 'app-video-call-chat',
  templateUrl: './video-call-chat.component.html',
  styleUrls: [ './video-call-chat.component.scss' ]
})

export class VideoCallChatComponent implements OnInit, AfterViewInit, AfterViewChecked, ChatCallback, OnDestroy, ICanDeactivateComponent {
  load = 'chat'
  camera = true
  microphone = true
  chat = false
  fileurl = ''
  errorColor = ''
  isFullScreen = false
  fixed
  ticks = 0
  time = 0
  minutesDisplay = 0
  hoursDisplay = 0
  secondsDisplay = 0
  NamePatient
  minutesLabel
  secondsLabel
  totalSeconds = 0
  zoomedImageSrc
  doctorData
  appointment: any
  @ViewChild('myFil') myFil: ElementRef

  imageUrl: string
  subImageUrl: Subscription

  private isCallFinish = false

  constructor (private router: Router,
               public videoService: VideoChatService,
               private _script: ScriptLoaderService,
               public upload: ChatService,
               private eleRef: ElementRef,
               private switcherService: SwitcherService,
               private appointmentService: AppointmentService,
               private location: PlatformLocation,
               private skylinkService: SkylinkService,
               private dialog: MatDialog) {

    window[ 'endCallPacient' ] = true
    location.onPopState(() => {
      console.log('pressed back!')
    })
  }

  setTime () {
    ++this.totalSeconds
    this.secondsLabel = this.pad(this.totalSeconds % 60)
    this.minutesLabel = this.pad(Math.floor(this.totalSeconds / 60))
  }

  pad (val) {
    const valString = val + ''
    if (valString.length < 2) {
      return '0' + valString
    } else {
      return valString
    }
  }

  onNavigate (go: string) {
    this.load = go
  }

  ngAfterViewInit () {

    this.appointment = JSON.parse(localStorage.getItem('appointment'))
    this.skylinkService.init(this.appointment.appointment_id.toString())
  }

  ngAfterViewChecked () {
    if (window[ 'endCallPacient' ] === false) {
      console.log('****************************  endCallPacient')
      this.videoService.live_room()
      this.isCallFinish = true;
      this.router.navigate([ 'video-call-chat/video-end' ])
    }
  }

  ngOnInit () {
    setInterval(() => {
      this.setTime()
    }, 1000)
    const appointme = JSON.parse(localStorage.getItem('appointment'))
    this.NamePatient = appointme.first_name + ' ' + appointme.last_name
    this.getImageUrl()
    // this.get_appointment_from_switcherService();
    this.appointment = JSON.parse(localStorage.getItem('appointment'))
    console.log(this.appointment)
  }

  on_off_camera () {
    if (this.camera) {
      this.camera = false
      this.videoService.off_camera()
    } else {
      this.camera = true
      this.videoService.on_camera()
    }

  }

  on_off_microphone () {
    if (this.microphone) {
      this.microphone = false
      this.videoService.off_microphone()
    } else {
      this.microphone = true
      this.videoService.on_microphone()
    }
  }

  fullScreen () {
    this.isFullScreen = !this.isFullScreen
  }

  endCall () {
    this.appointmentFinish()
  }

  FileUpload (event: any) {
    // console.log(event);
    if (event.target.files && event.target.files[ 0 ]) {
      // console.log(event.target.files[0].size);
      if (event.target.files[ 0 ].size <= 10003010) {
        const reader = new FileReader()
        reader.onload = (data: any) => {
        }
        this.upload.fileUploadChat(event.target.files[ 0 ].name, event.target.files[ 0 ], this, done => {
          this.fixed = done
        })
        this.errorColor = ''
      } else {
        this.fileurl = 'минимальный размер файла - 10M'
        this.errorColor = 'red'
        return
      }
    }
  }

  ChatCallback (data: string, result: any) {
    if (data) {
      this.fileurl = data
      // console.log(this.fileurl);
      // console.log('TRIGER');
    }
  }

  FileUploadCall () {
    this.chat = true
    const el: HTMLElement = this.myFil.nativeElement as HTMLElement
    el.click()
  }

  styleMethod () {
    return {
      color: this.errorColor,
    }
  }

  getImageUrl () {
    this.subImageUrl = this.switcherService.imageURL.subscribe(imageUrl => {
      // console.log(imageUrl);
      this.imageUrl = imageUrl
    })
  }

  appointmentFinish () {
    this.appointmentService.appointmentFinish(this.appointment.appointment_id).subscribe(res => {
      // console.log('******* finish appointment');
      // console.log(res);
      this.videoService.live_room()
      this.isCallFinish = true
      this.router.navigate([ 'video-call-chat/video-end' ])
    })
    // this.videoService.live_room();
    // this.router.navigate(['video-call-chat/video-end']);
  }

  ngOnDestroy () {
    this.subImageUrl.unsubscribe()
    // this.appointment.chatTime = `${this.minutesDisplay}:${this.secondsDisplay}`;
    this.appointment.chatTime = `${this.time}`
    this.appointment.chatTime = `${this.minutesLabel}:${this.secondsLabel}`
    localStorage.setItem('appointment', JSON.stringify(this.appointment))

    if (!this.isCallFinish) {
      this.appointmentService.appointmentFinish(this.appointment.appointment_id).subscribe(res => {
        this.videoService.live_room();
        this.isCallFinish = true;
      });
    }
  }

  canDeactivate (configDialog: MatDialogConfig): Observable<boolean> | boolean {

    if (this.isCallFinish) {
      return true;
    }

    const config = Object.assign({}, configDialog, {
      data: {
        confirmed: 0,
        title: 'Подтверждение действия',
        text: `
          Вы пытаетесь покинуть страницу!
          В случае подтверждения вашего действия соединение с пациентом
          разорвется и вы не сможете завершить прием
        `
      }
    });
    const dialogRef = this.dialog.open(ModalDialogComponent, config);

    return dialogRef.afterClosed().map(result => Boolean(result));
  }

}

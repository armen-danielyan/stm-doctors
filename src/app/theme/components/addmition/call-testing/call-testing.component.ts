import {AfterViewInit, Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {ScriptLoaderService} from '../../../../service/script-loader.service';
import {Router} from '@angular/router';
import { VideoChatService } from '../../../../service/video-chat.service';

@Component({
  selector: 'app-call-testing',
  templateUrl: './call-testing.component.html',
  styleUrls: ['./call-testing.component.scss']
})
export class CallTestingComponent implements OnInit, AfterViewInit {
  @Output() testing = new EventEmitter<string>();


  constructor(private _script: ScriptLoaderService,
              private videoService: VideoChatService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._script.load('app-call-testing',
      'assets/js/prep/main.js', 'assets/js/prep/audio-widget.js', 'assets/js/prep/soundmeter.js', 'assets/js/prep/main-2.js');
  }

  ngOnDestroy() {
    if (window['video'] && window['video'].srcObject && window['video'].srcObject.getVideoTracks()[0]) {
      window['video'].srcObject.getVideoTracks()[0].stop();
    }
    if (window['stream'] && window['stream'].getTracks()[0]) {
      window['stream'].getTracks()[0].stop();
    }
  }

  goBack() {
    if (window['video'] && window['video'].srcObject && window['video'].srcObject.getVideoTracks()[0]) {
      window['video'].srcObject.getVideoTracks()[0].stop();
    }
    if (window['stream'] && window['stream'].getTracks()[0]) {
      window['stream'].getTracks()[0].stop();
    }
    this.testing.emit('client-data');
  }


}

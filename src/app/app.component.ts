import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RefreshGuardService } from './service/refresh-guard.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private refreshGuardService: RefreshGuardService) {
    refreshGuardService.addListener();
  }

}

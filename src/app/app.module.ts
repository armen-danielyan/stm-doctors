import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {ThemeModule} from './theme/theme.module';
import {AuthModule} from './auth/auth.module';

import { AppComponent } from './app.component';

import {DoctorRegistrationService} from './service/doctor-registration.service';
import {AwsUtil} from './service/aws.service';
import {CognitoUtil} from './service/cognito.service';
import {DoctorLoginService} from './service/doctor-login.service';
import { AttachService } from './auth/_services/attach.service';
import { DoctorCrudService } from './auth/_services/doctor-crud.service';
import {ScriptLoaderService} from './service/script-loader.service';
import {ChatService} from './service/chat.service';
import {VideoChatService} from './service/video-chat.service';
import {GetCityService} from './auth/_services/get-city.service';
import {AppointmentService} from './theme/_services/appointment.service';
import {SwitcherService} from './theme/_services/switcher.service';
import {SpprServiceService} from './theme/_services/sppr-service.service';
import {CheckDoctorService} from './theme/_services/check-doctor.service';

import { APP_CONFIG, APP_CONFIG_TOKEN } from './app.config';
import { RefreshGuardService } from './service/refresh-guard.service'


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    ThemeModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AwsUtil,
    CognitoUtil,
    DoctorRegistrationService,
    DoctorLoginService,
    AttachService,
    DoctorCrudService,
    ScriptLoaderService,
    ChatService,
    VideoChatService,
    GetCityService,
    AppointmentService,
    SwitcherService,
    SpprServiceService,
    CheckDoctorService,
    RefreshGuardService,
    {
      provide: APP_CONFIG_TOKEN,
      useValue: APP_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

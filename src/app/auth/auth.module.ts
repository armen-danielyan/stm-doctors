import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {TextMaskModule} from 'angular2-text-mask';
import {HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';


import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {ChangePasswordComponent} from '../theme/components/change-password/change-password.component';
import {RegistrationStep2Component} from './registration/registration-step-2/registration-step-2.component';
import {RegistrationStep3Component} from './registration/registration-step-3/registration-step-3.component';
import {TestProcessComponent} from './other/test-process/test-process.component';
import {StartTestingComponent} from './other/start-testing/start-testing.component';
import { ChangeNumberComponent } from './change-number/change-number.component';
import { ResetPassword1Component } from './password/reset-password-1/reset-password-1.component';
import { EnterProblemComponent } from './other/enter-problem/enter-problem.component';
import { ConfirmProblemComponent } from './other/confirm-problem/confirm-problem.component';
import { ConfirmCodeComponent } from './other/confirm-code/confirm-code.component';
import { RegistrationProffesionComponent } from './registration/registration-proffesion/registration-proffesion.component';
import { RegistrationPersonalInfoComponent } from './registration/registration-personal-info/registration-personal-info.component';
import { RegistrationEducationComponent } from './registration/registration-education/registration-education.component';
import { RegistrationCareerComponent} from './registration/registration-career/registration-career.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ClickOutsideModule} from 'ng4-click-outside';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AuthRoutingModule,
    TextMaskModule,
    SharedModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    ChangePasswordComponent,
    RegistrationStep2Component,
    RegistrationStep3Component,
    TestProcessComponent,
    StartTestingComponent,
    ChangeNumberComponent,
    ResetPassword1Component,
    EnterProblemComponent,
    ConfirmProblemComponent,
    ConfirmCodeComponent,
    RegistrationProffesionComponent,
    RegistrationPersonalInfoComponent,
    RegistrationEducationComponent,
    RegistrationCareerComponent,
  ],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
})

export class AuthModule {

}

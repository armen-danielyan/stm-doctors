import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChangePasswordComponent} from '../theme/components/change-password/change-password.component';
import {RegistrationStep2Component} from './registration/registration-step-2/registration-step-2.component';
import {RegistrationStep3Component} from './registration/registration-step-3/registration-step-3.component';
import {TestProcessComponent} from './other/test-process/test-process.component';
import {StartTestingComponent} from './other/start-testing/start-testing.component';
import {ChangeNumberComponent} from './change-number/change-number.component';
import {ResetPassword1Component} from './password/reset-password-1/reset-password-1.component';
import {ResetPassword2Component} from './password/reset-password-2/reset-password-2.component';
import {ChangeNumber2Component} from '../theme/components/change-number-2/change-number-2.component';
import {EnterProblemComponent} from './other/enter-problem/enter-problem.component';
import {ConfirmProblemComponent} from './other/confirm-problem/confirm-problem.component';
import {AuthComponent} from './auth.component';
import {ConfirmCodeComponent} from './other/confirm-code/confirm-code.component';
import {RegistrationProffesionComponent} from './registration/registration-proffesion/registration-proffesion.component';
import {RegistrationPersonalInfoComponent} from './registration/registration-personal-info/registration-personal-info.component';
import {RegistrationEducationComponent} from './registration/registration-education/registration-education.component';
import {RegistrationCareerComponent} from './registration/registration-career/registration-career.component';
import {ThemeGuardService} from './_guard/theme-guard.service';
import {ProfileCheckGuardService} from './_guard/profile-check-guard.service';


const routes: Routes = [
  {path: '', component: AuthComponent, canActivate: [ThemeGuardService] , children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration-step-1',
        loadChildren: './registration/registration-step-1/registration-step-1.module#RegistrationStep1Module'
      },
      {
        path: 'registration-step-2',
        component: RegistrationStep2Component
      },
      {
        path: 'registration-step-3',
        component: RegistrationStep3Component
      },
      {
        path: 'change-number',
        component: ChangeNumberComponent
      },
      {
        path: 'reset-password-2',
        component: ResetPassword2Component
      },
      {
        path: 'reset-password-1',
        component: ResetPassword1Component
      },
      {
        path: 'confirm-problem',
        component: ConfirmProblemComponent
      },
      {
        path: 'confirm-code',
        component: ConfirmCodeComponent
      },
      {
        path: 'start-testing',
        component: StartTestingComponent
      },

      {
        path: 'test-process',
        component: TestProcessComponent
      },
      {
        path: 'user-agreement',
        loadChildren: './other/user-agreement/user-agreement.module#UserAgreementModule'
      },
    ],
  },
  {
    path: '', component: AuthComponent, canActivate: [ProfileCheckGuardService], children: [
      {
        path: 'registration-proffesion',
        component: RegistrationProffesionComponent
      },
      {
        path: 'registration-personal-info',
        component: RegistrationPersonalInfoComponent
      },
      {
        path: 'registration-education',
        component: RegistrationEducationComponent
      },
      {
        path: 'registration-career',
        component: RegistrationCareerComponent
      },
      {
        path: 'attach-file',
        loadChildren: './other/attach-file/attach-file.module#AttachFileModule'
      }
    ]
  },
  {
    path: 'enter-problem',
    component: EnterProblemComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [ThemeGuardService, ProfileCheckGuardService]
})

export class AuthRoutingModule {
}

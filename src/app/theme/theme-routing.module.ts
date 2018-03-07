import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ThemeComponent} from './theme.component';
import {AuthGuard} from '../auth/_guard/auth-guard.service';
import {ChangeNumber2Component} from './components/change-number-2/change-number-2.component';
import {ResetPassword2Component} from '../auth/password/reset-password-2/reset-password-2.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {CallTestingComponent} from './components/addmition/call-testing/call-testing.component';

const router: Routes = [
  {
    path: '', component: ThemeComponent,  canActivate: [AuthGuard],  children: [
      {
        path: 'index',
        loadChildren: './components/index/index.module#IndexModule'
      },
      {
        path: 'history-finance',
        loadChildren: './components/finance/history-finance/history_finance.module#HistoryFinanceModule'
      },
      {
        path: 'requests-for-withdrawal',
        loadChildren: './components/finance/my_requisites/requests-for-withdrawal/requests-for-withdrawal.module#RequestsForWithdrawalModule'
      },
      {
        path: 'card-requisite',
        loadChildren: './components/finance/my_requisites/card-requisite/card-requisite.module#CardRequisiteModule'
      },
      {
        path: 'withdrawal-requests',
        loadChildren: './components/finance/withdrawal-requests/withdrawal-requests.module#WithdrawalRequestsModule'
      },
      {
        path: 'choose',
        loadChildren: './components/addmition/choose/choose.module#ChooseModule'
      },
      {
        path: 'video-call-chat',
        loadChildren: './components/addmition/video-call-chat/video-call-chat.module#VideoCallChatModule'
      },
      {
        path: 'change-number-2',
        component: ChangeNumber2Component
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'support',
        loadChildren: './components/support/support.module#SupportModule'
      },
      {
        path: 'personal-data',
        loadChildren: './components/personal-data/personal-data.module#PersonalDataModule'
      },
      {
        path: 'call-testing',
        // loadChildren: './components/addmition/call-testing/call-testing.module#CallTestingComponentModule'
        component: CallTestingComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class ThemeRoutingModule {
}



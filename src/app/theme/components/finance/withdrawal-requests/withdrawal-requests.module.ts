import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { WithdrawalRequestsComponent } from './withdrawal-requests.component';

const router: Routes = [
  {path: '', component: WithdrawalRequestsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ],
  declarations: [WithdrawalRequestsComponent]
})

export class WithdrawalRequestsModule {}

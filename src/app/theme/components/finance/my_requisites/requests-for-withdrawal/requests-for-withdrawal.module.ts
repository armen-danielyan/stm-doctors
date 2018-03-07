import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { RequestsForWithdrawalComponent } from './requests-for-withdrawal.component';

const router: Routes = [
  {path: '', component: RequestsForWithdrawalComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ],
  declarations: [RequestsForWithdrawalComponent]
})

export class RequestsForWithdrawalModule {}

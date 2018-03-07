import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HistoryFinanceComponent} from './history-finance.component';


const router: Routes = [
  {path: '', component: HistoryFinanceComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [RouterModule],
  declarations: [
    HistoryFinanceComponent
  ]
})

export class HistoryFinanceModule {
}

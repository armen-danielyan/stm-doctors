import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationStep1Component} from './registration-step-1.component';


const routes: Routes = [
  {path: '', component: RegistrationStep1Component}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    RegistrationStep1Component
  ]
})
export class RegistrationStep1Module {
}

import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {TextMaskModule} from 'angular2-text-mask';
import {PersonalDataComponent} from './personal-data.component';


const router: Routes = [
  {path: '', component: PersonalDataComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    TextMaskModule
  ],
  exports: [
    RouterModule,
  ],
  declarations: [PersonalDataComponent]
})

export class PersonalDataModule{}

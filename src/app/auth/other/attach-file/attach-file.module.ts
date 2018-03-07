import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {AttachFileComponent} from './attach-file.component';

const routes: Routes = [
  {path: '', component: AttachFileComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AttachFileComponent
  ]
})
export class AttachFileModule {
}

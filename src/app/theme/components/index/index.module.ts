import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {TextMaskModule} from 'angular2-text-mask';
import {IndexComponent} from './index.component';
import {ThemeShareModule} from '../../theme-share.module';
import {LoaderComponent} from '../../layouts/loader/loader.component';

const router: Routes = [
  {path: '', component: IndexComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    TextMaskModule,
    ThemeShareModule,
    SharedModule
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    IndexComponent,
    LoaderComponent
  ]
})

export class IndexModule {}

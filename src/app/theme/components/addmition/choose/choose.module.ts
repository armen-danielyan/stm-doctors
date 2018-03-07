import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChooseComponent} from './choose.component';
import {ThemeShareModule} from '../../../theme-share.module';
import {SharedModule} from '../../../../shared/shared.module';

const router: Routes = [
  {path: '', component: ChooseComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    ThemeShareModule,
    SharedModule,

  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ChooseComponent,

  ]
})
export class ChooseModule {}

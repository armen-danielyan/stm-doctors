import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SupportComponent} from './support.component';
import {CommonModule} from '@angular/common';
import {ClickOutsideModule} from 'ng4-click-outside';
import {ClickoutsideService} from '../../../auth/_services/clickoutside.service';

const router: Routes = [
  {path: '', component: SupportComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ClickOutsideModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    SupportComponent
  ],
  providers: [ClickoutsideService]
})

export class SupportModule {

}

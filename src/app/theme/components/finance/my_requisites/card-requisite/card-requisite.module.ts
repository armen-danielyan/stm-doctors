import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { CardRequisiteComponent } from './card-requisite.component';

const router: Routes = [
  {path: '', component: CardRequisiteComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ],
  declarations: [CardRequisiteComponent]
})

export class CardRequisiteModule {}

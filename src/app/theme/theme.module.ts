import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ThemeRoutingModule} from './theme-routing.module';
import {ThemeComponent} from './theme.component';
import {HeaderNavComponent} from './layouts/header-nav/header-nav.component';
import {AsideNavComponent} from './layouts/aside-nav/aside-nav.component';
import {SidebarDirective} from '../shared/sidebar.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChangeNumber2Component } from './components/change-number-2/change-number-2.component';
import { ResetPassword2Component } from '../auth/password/reset-password-2/reset-password-2.component';
import { ModalDialogComponent } from './components/modal-component/modal-component';
import { MatDialogModule } from '@angular/material';






@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    FormsModule,
    SharedModule,
    MatDialogModule
  ],
  declarations: [
    ThemeComponent,
    HeaderNavComponent,
    AsideNavComponent,
    ChangeNumber2Component,
    ResetPassword2Component,
    SidebarDirective,
    NotFoundComponent,
    ModalDialogComponent
  ],
  entryComponents: [
    ModalDialogComponent
  ]
})
export class ThemeModule {
}


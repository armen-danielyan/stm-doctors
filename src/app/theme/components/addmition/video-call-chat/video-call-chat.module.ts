import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {EditorModule} from '@tinymce/tinymce-angular';
import {VideoCallChatComponent} from './video-call-chat.component';
import {CardComponent} from './card/card.component';
import {VideoEndComponent} from './video-end/video-end.component';
import {SharedModule} from '../../../../shared/shared.module';
import {ImageZoomModule} from 'angular2-image-zoom';
import {MiniLoaderComponent} from '../../../layouts/mini-loader/mini-loader.component';
import {SkylinkService} from '../../../_services/skylink.service';
import { CanDeactivateDialogGuard } from '../../../../shared/guards/can-deactivate-dialog.guard'


const router: Routes = [
  {path: '', component: VideoCallChatComponent, canDeactivate: [ CanDeactivateDialogGuard ]},
  {path: 'video-end', component: VideoEndComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    SharedModule,
    EditorModule,
    ImageZoomModule
  ],
  exports: [
    RouterModule,
    CardComponent,
  ],
  declarations: [
    VideoCallChatComponent,
    VideoEndComponent,
    MiniLoaderComponent
  ],
  providers: [
    SkylinkService,
    CanDeactivateDialogGuard
  ]
})

export class VideoCallChatModule {
}


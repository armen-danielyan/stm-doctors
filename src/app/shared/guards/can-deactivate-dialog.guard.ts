import { Inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ModalDialogComponent } from '../../theme/components/modal-component/modal-component';

export interface ICanDeactivateComponent {
  canDeactivate(dialogConfig: any): Observable<boolean> | boolean;
}

export interface ICanDeactivateData {
  title: string;
  text: string;
}

@Injectable()
export class CanDeactivateDialogGuard implements CanDeactivate<ICanDeactivateComponent> {

  private readonly DIALOG_CONFIG = {
    position: { top: '140px'},
    role: 'dialog',
  };

  constructor(private dialog: MatDialog) {
  }

  canDeactivate(component: ICanDeactivateComponent): Observable<boolean> | boolean {
    return component.canDeactivate(this.DIALOG_CONFIG);
  }
}

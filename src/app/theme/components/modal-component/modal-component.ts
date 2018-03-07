import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'modal-dialog',
  templateUrl: './modal-component.html',
  styleUrls: ['./modal-component.scss']
})
export class ModalDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalDialogComponent>) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    confirmAction() {
      this.data.confirmed = 1;
      this.dialogRef.close(this.data.confirmed);
    }
}


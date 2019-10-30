import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comfirme-dialog',
  templateUrl: './comfirme-dialog.component.html',
  styleUrls: ['./comfirme-dialog.component.scss']
})
export class ComfirmeDialogComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ComfirmeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
      this.title = data.title;
      this.message = data.message;}

  public onDismiss(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }
}

export class ConfirmDialogModel {
  constructor(public title: string, public message: string) { }
}
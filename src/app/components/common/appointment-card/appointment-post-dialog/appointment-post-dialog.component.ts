import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentPost } from 'src/app/models/appointment-post';

@Component({
  selector: 'app-appointment-post-dialog',
  templateUrl: './appointment-post-dialog.component.html',
  styleUrls: ['./appointment-post-dialog.component.css'],
})
export class AppointmentPostDialogComponent {
  slots: number = 1;
  invalidMessage: string;

  constructor(public dialogRef: MatDialogRef<AppointmentPostDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    const appointmentPost = {
      appointment: this.data.appointment,
      slots: this.slots,
    } as AppointmentPost;

    this.dialogRef.close(appointmentPost);
  }

  invalidSlots(): boolean {
    if (this.slots <= 0) {
      this.invalidMessage = 'Free slots must be greater than 0';
      return true;
    }

    if (!Number.isInteger(+this.slots)) {
      this.invalidMessage = 'Free slots must an integer';
      return true;
    }

    this.invalidMessage = '';
    return false;
  }
}

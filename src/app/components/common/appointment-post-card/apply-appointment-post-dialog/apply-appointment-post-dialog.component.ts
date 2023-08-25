import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apply-appointment-post-dialog',
  templateUrl: './apply-appointment-post-dialog.component.html',
  styleUrls: ['./apply-appointment-post-dialog.component.css'],
})
export class ApplyAppointmentPostDialogComponent {
  slots: number = 1;

  constructor(public dialogRef: MatDialogRef<ApplyAppointmentPostDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let appointmentPost = this.data.appointmentPost;
    if (!appointmentPost.applicants) {
      appointmentPost.applicants = new Array<string>();
    }

    for (let i = 1; i <= this.slots; i++) {
      appointmentPost.applicants.push(this.data.username);
    }

    this.dialogRef.close(appointmentPost);
  }
}

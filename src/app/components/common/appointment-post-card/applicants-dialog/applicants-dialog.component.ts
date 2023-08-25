import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-applicants-dialog',
  templateUrl: './applicants-dialog.component.html',
  styleUrls: ['./applicants-dialog.component.css'],
})
export class ApplicantsDialogComponent {
  removedApplicants: boolean = false;

  constructor(public dialogRef: MatDialogRef<ApplicantsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data.applicants);
  }

  onApplicantRemove(applicantIndex: number) {
    this.data.applicants.splice(applicantIndex, 1);
    this.removedApplicants = true;
  }
}

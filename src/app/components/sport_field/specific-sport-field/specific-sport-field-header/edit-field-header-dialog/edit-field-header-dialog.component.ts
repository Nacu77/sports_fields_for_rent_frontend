import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';

@Component({
  selector: 'app-edit-field-header-dialog',
  templateUrl: './edit-field-header-dialog.component.html',
  styleUrls: ['./edit-field-header-dialog.component.css'],
})
export class EditFieldHeaderDialogComponent {
  errorsMap: Map<string, string>;

  constructor(
    private sportFieldService: SportFieldService,
    public dialogRef: MatDialogRef<EditFieldHeaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.sportFieldService.update(this.data.sportField).subscribe({
      next: () => {
        this.dialogRef.close(this.data.sportField);
      },
      error: (e: HttpErrorResponse) => {
        this.errorsMap = new Map<string, string>();
        e.error.errors.forEach((err: { field: string; defaultMessage: string }) => {
          this.errorsMap.set(err.field, err.defaultMessage);
        });
      },
    });
  }
}

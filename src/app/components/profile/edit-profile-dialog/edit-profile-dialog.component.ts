import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css'],
})
export class EditProfileDialogComponent {
  errorsMap: Map<string, string>;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let user: User = { ...this.data.user };
    if (!user.password) {
      user.password = this.data.password;
    }

    this.userService.updateProfile(user).subscribe({
      next: () => {
        this.dialogRef.close(user);
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

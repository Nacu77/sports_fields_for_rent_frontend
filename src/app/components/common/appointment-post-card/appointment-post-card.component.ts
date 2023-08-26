import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { ApplyAppointmentPostDialogComponent } from './apply-appointment-post-dialog/apply-appointment-post-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { ApplicantsDialogComponent } from './applicants-dialog/applicants-dialog.component';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-post-card',
  templateUrl: './appointment-post-card.component.html',
  styleUrls: ['./appointment-post-card.component.css'],
})
export class AppointmentPostCardComponent {
  @Input() appointmentPost: AppointmentPost;

  @Output() prepareDeleteAppointmentPost = new EventEmitter<AppointmentPost>();
  @Output() deleteAppointmentPost = new EventEmitter<void>();
  @Output() appointmentPostUpdated = new EventEmitter<void>();

  constructor(
    private appointmentPostService: AppointmentPostService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onPrepareCancelAppointmentPost(): void {
    this.prepareDeleteAppointmentPost.emit(this.appointmentPost);
  }

  onCancelAppointmentPost(): void {
    this.deleteAppointmentPost.emit();
  }

  openApplyAppointmentPostDialog(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return;
    }

    const dialogRef = this.dialog.open(ApplyAppointmentPostDialogComponent, {
      data: {
        appointmentPost: { ...this.appointmentPost },
        username: this.userService.getUsername(),
      },
    });

    dialogRef.afterClosed().subscribe((appointmentPost: AppointmentPost) => {
      if (appointmentPost) {
        this.appointmentPostService.update(appointmentPost).subscribe({
          next: () => {
            this.appointmentPostUpdated.emit();
            savedChangesSnackBar('Applied successfully to appointment post', this.snackBar);
          },
          error: (_e: HttpErrorResponse) => {
            savedChangesSnackBar('Error while applying to appointment post', this.snackBar);
          },
        });
      }
    });
  }

  openApplicantsDialog(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return;
    }

    const dialogRef = this.dialog.open(ApplicantsDialogComponent, {
      data: {
        applicants: this.appointmentPost.applicants ? [...this.appointmentPost.applicants] : undefined,
        username: this.userService.getUsername(),
      },
    });

    dialogRef.afterClosed().subscribe((applicants: Array<string>) => {
      if (applicants) {
        this.appointmentPost.applicants = applicants;
        this.appointmentPostService.update(this.appointmentPost).subscribe({
          next: () => {
            this.appointmentPostUpdated.emit();
            savedChangesSnackBar('Edited successfully applicants of appointment post', this.snackBar);
          },
          error: (_e: HttpErrorResponse) => {
            savedChangesSnackBar('Error while editing applicants of appointment post', this.snackBar);
          },
        });
      }
    });
  }
}

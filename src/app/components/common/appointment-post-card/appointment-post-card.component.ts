import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { ApplyAppointmentPostDialogComponent } from './apply-appointment-post-dialog/apply-appointment-post-dialog.component';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-post-card',
  templateUrl: './appointment-post-card.component.html',
  styleUrls: ['./appointment-post-card.component.css'],
})
export class AppointmentPostCardComponent {
  @Input() appointmentPost: AppointmentPost;

  @Output() prepareDeleteAppointmentPost = new EventEmitter<AppointmentPost>();
  @Output() deleteAppointmentPost = new EventEmitter<void>();
  @Output() appliedAppointmenPost = new EventEmitter<AppointmentPost>();

  constructor(private userService: UserService, public dialog: MatDialog, private router: Router) {}

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
        this.appliedAppointmenPost.emit(appointmentPost);
      }
    });
  }
}

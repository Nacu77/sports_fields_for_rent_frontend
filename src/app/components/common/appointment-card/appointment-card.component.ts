import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentPostDialogComponent } from './appointment-post-dialog/appointment-post-dialog.component';
import { AppointmentPost } from 'src/app/models/appointment-post';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent {
  @Input() appointment: Appointment;
  @Input() isCurrent: boolean;
  @Input() forProfile: boolean;

  @Output() prepareCancelAppointment = new EventEmitter<Appointment>();
  @Output() cancelAppointment = new EventEmitter<void>();
  @Output() newAppointmentPost = new EventEmitter<AppointmentPost>();

  constructor(public dialog: MatDialog) {}

  onPrepareCancelAppointment(): void {
    this.prepareCancelAppointment.emit(this.appointment);
  }

  onCancelAppointment(): void {
    this.cancelAppointment.emit();
  }

  openAppointmentPostDialog(): void {
    const dialogRef = this.dialog.open(AppointmentPostDialogComponent, {
      data: { appointment: this.appointment },
    });

    dialogRef.afterClosed().subscribe((appointmentPost: AppointmentPost) => {
      if (appointmentPost) {
        this.newAppointmentPost.emit(appointmentPost);
      }
    });
  }
}

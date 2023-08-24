import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { GetAppointmentsForSpecificUserRequest } from 'src/app/models/requests/get-appointments-for-specific-user-request';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

@Component({
  selector: 'app-profile-current-appointments',
  templateUrl: './profile-current-appointments.component.html',
  styleUrls: ['./profile-current-appointments.component.css'],
})
export class ProfileCurrentAppointmentsComponent implements OnInit {
  @Input() username: string;

  currentAppointments: Array<Appointment>;

  private appointmentToCancel: Appointment;

  constructor(
    private appointmentService: AppointmentService,
    private appointmentPostService: AppointmentPostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const getAppointmentsForSpecificUserRequest: GetAppointmentsForSpecificUserRequest = {
      username: this.username,
      isCurrent: true,
    };
    this.appointmentService
      .getAppointmentsForSpecificUser(getAppointmentsForSpecificUserRequest)
      .subscribe((appointments) => (this.currentAppointments = appointments));
  }

  onPrepareCancelAppointment(appointment: Appointment): void {
    this.appointmentToCancel = appointment;
  }

  onCancelAppointment(): void {
    this.appointmentService.delete(this.appointmentToCancel.id).subscribe({
      next: () => {
        this.currentAppointments = this.currentAppointments.filter((currentAppointment) => currentAppointment.id !== this.appointmentToCancel.id);
        savedChangesSnackBar('Appointment canceled successfully', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while canceling appointment', this.snackBar);
      },
    });
  }

  onNewAppointmentPost(appointmentPost: AppointmentPost): void {
    this.appointmentPostService.create(appointmentPost).subscribe({
      next: () => {
        savedChangesSnackBar('Appointment Post created successfully', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while creating appointmnent post', this.snackBar);
      },
    });
  }
}

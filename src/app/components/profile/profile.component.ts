import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/appointment';
import { GetAppointmentsForSpecificUserRequest } from 'src/app/models/requests/get-appointments-for-specific-user-request';
import { User } from 'src/app/models/user';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { UserService } from 'src/app/services/user/user.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  currentAppointments: Array<Appointment>;
  appointmentToCancel: Appointment;

  constructor(private userService: UserService, private appointmentService: AppointmentService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const username = sessionStorage.getItem('app.username');
    if (username) {
      this.userService.getProfile(username).subscribe((user) => (this.user = user));

      const getAppointmentsForSpecificUserRequest: GetAppointmentsForSpecificUserRequest = {
        username: username,
        isCurrent: true,
      };
      this.appointmentService.getAppointmentsForSpecificUser(getAppointmentsForSpecificUserRequest).subscribe((appointments) => {
        this.currentAppointments = appointments;
        this.formatAppointments(appointments);
      });
    }
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

  private formatAppointments(appointments: Array<Appointment>): void {
    appointments.forEach((appointment) => {
      appointment.startDateTime = appointment.startDateTime.replace('T', ' ').slice(0, -3);
      appointment.endDateTime = appointment.endDateTime.replace('T', ' ').slice(0, -3);
    });
  }
}

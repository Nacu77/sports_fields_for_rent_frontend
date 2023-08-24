import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { GetAppointmentsForSpecificUserRequest } from 'src/app/models/requests/get-appointments-for-specific-user-request';
import { SportField } from 'src/app/models/sport-field';
import { User } from 'src/app/models/user';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { UserService } from 'src/app/services/user/user.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

enum ProfileOptions {
  CURRENT_APPOINTMENTS,
  APPOINTMENTS_HISTORY,
  OWNED_FIELDS,
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  currentAppointments: Array<Appointment>;
  appointmentsHistory: Array<Appointment>;
  ownedFields: Array<SportField>;

  appointmentToCancel: Appointment;
  fieldToDelete: SportField;
  selectedOption: ProfileOptions = ProfileOptions.CURRENT_APPOINTMENTS;

  ProfileOptionsType = ProfileOptions;

  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService,
    private appointmentPostService: AppointmentPostService,
    private sportFieldService: SportFieldService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAppointments(true);
  }

  showCurrentAppointments(): void {
    this.selectedOption = ProfileOptions.CURRENT_APPOINTMENTS;
    this.getAppointments(true);
  }

  showAppointmentsHistory(): void {
    this.selectedOption = ProfileOptions.APPOINTMENTS_HISTORY;
    this.getAppointments(false);
  }

  showOwnedFields(): void {
    this.selectedOption = ProfileOptions.OWNED_FIELDS;
    this.getOwnedFields();
  }

  displayOwnedFields(): boolean {
    return this.userService.isUserInRole('OWNER');
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

  onPrepareDeleteField(sportField: SportField): void {
    this.fieldToDelete = sportField;
  }

  onDeleteField(): void {
    this.sportFieldService.delete(this.fieldToDelete.id).subscribe({
      next: () => {
        this.ownedFields = this.ownedFields.filter((ownedField) => ownedField.id !== this.fieldToDelete.id);
        savedChangesSnackBar('Field deleted successfully', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while deleting field', this.snackBar);
      },
    });
  }

  private getAppointments(isCurrent: boolean): void {
    const username = this.userService.getUsername();
    if (username) {
      this.userService.getProfile(username).subscribe((user) => (this.user = user));

      const getAppointmentsForSpecificUserRequest: GetAppointmentsForSpecificUserRequest = {
        username: username,
        isCurrent: isCurrent,
      };
      this.appointmentService.getAppointmentsForSpecificUser(getAppointmentsForSpecificUserRequest).subscribe((appointments) => {
        if (isCurrent) {
          this.currentAppointments = appointments;
        } else {
          this.appointmentsHistory = appointments;
        }
      });
    }
  }

  private getOwnedFields(): void {
    const username = this.userService.getUsername();
    if (username) {
      this.sportFieldService.findAllByUser(username).subscribe((sportFields) => (this.ownedFields = sportFields));
    }
  }
}

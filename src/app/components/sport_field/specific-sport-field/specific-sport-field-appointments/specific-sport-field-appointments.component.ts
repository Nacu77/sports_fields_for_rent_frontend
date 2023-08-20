import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/appointment';
import { GetAppointmentsForSpecificFieldRequest } from 'src/app/models/requests/get-appointments-for-specific-field-request';
import { SportField } from 'src/app/models/sport-field';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { formatAppointments } from 'src/app/utility/format-utilities';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

enum ProfileOptions {
  CURRENT_APPOINTMENTS,
  APPOINTMENTS_HISTORY,
}

@Component({
  selector: 'app-specific-sport-field-appointments',
  templateUrl: './specific-sport-field-appointments.component.html',
  styleUrls: ['./specific-sport-field-appointments.component.css'],
})
export class SpecificSportFieldAppointmentsComponent implements OnInit {
  @Input() sportField: SportField;

  currentAppointments: Array<Appointment>;
  appointmentsHistory: Array<Appointment>;

  appointmentToCancel: Appointment;
  selectedOption: ProfileOptions = ProfileOptions.CURRENT_APPOINTMENTS;

  ProfileOptionsType = ProfileOptions;

  constructor(private appointmentService: AppointmentService, private snackBar: MatSnackBar) {}

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

  private getAppointments(isCurrent: boolean): void {
    const getAppointmentsForSpecificFieldRequest: GetAppointmentsForSpecificFieldRequest = {
      sportFieldId: this.sportField.id,
      isCurrent: isCurrent,
    };
    this.appointmentService.getAppointmentsForSpecificField(getAppointmentsForSpecificFieldRequest).subscribe((appointments) => {
      if (isCurrent) {
        this.currentAppointments = appointments;
        formatAppointments(this.currentAppointments);
      } else {
        this.appointmentsHistory = appointments;
        formatAppointments(this.appointmentsHistory);
      }
    });
  }
}

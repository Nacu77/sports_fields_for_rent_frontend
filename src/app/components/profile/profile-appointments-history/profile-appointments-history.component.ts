import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { GetAppointmentsForSpecificUserRequest } from 'src/app/models/requests/get-appointments-for-specific-user-request';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-profile-appointments-history',
  templateUrl: './profile-appointments-history.component.html',
  styleUrls: ['./profile-appointments-history.component.css'],
})
export class ProfileAppointmentsHistoryComponent implements OnInit {
  @Input() username: string;

  appointmentsHistory: Array<Appointment>;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    const getAppointmentsForSpecificUserRequest: GetAppointmentsForSpecificUserRequest = {
      username: this.username,
      isCurrent: false,
    };
    this.appointmentService
      .getAppointmentsForSpecificUser(getAppointmentsForSpecificUserRequest)
      .subscribe((appointments) => (this.appointmentsHistory = appointments));
  }
}

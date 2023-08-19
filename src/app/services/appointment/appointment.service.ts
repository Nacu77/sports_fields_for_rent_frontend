import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { GetAppointmentsForSpecificDateRequest } from 'src/app/models/requests/get-appointments-for-specific-date-request';
import { GetAppointmentsForSpecificUserRequest } from 'src/app/models/requests/get-appointments-for-specific-user-request';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private url = 'http://localhost:8080/api/appointments/';

  constructor(private http: HttpClient) {}

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.url, appointment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.url + id);
  }

  getAppointmentsForSpecificDate(getAppointmentsForSpecificDateRequest: GetAppointmentsForSpecificDateRequest): Observable<Array<Appointment>> {
    return this.http.post<Array<Appointment>>(this.url + 'get-appointments-for-specific-date', getAppointmentsForSpecificDateRequest);
  }

  getAppointmentsForSpecificUser(getAppointmentsForSpecificUserRequest: GetAppointmentsForSpecificUserRequest): Observable<Array<Appointment>> {
    return this.http.post<Array<Appointment>>(this.url + 'get-appointments-for-specific-user', getAppointmentsForSpecificUserRequest);
  }
}

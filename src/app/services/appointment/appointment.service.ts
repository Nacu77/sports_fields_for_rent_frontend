import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { GetAppointmentsForSpecificDateRequest } from 'src/app/models/requests/get-appointments-for-specific-date-request';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private url = 'http://localhost:8080/api/appointments/';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:admin'),
  });

  constructor(private http: HttpClient) {}

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.url, appointment, {
      headers: this.headers,
    });
  }

  getAppointmentsForSpecificDate(getAppointmentsForSpecificDateRequest: GetAppointmentsForSpecificDateRequest): Observable<Array<Appointment>> {
    return this.http.post<Array<Appointment>>(this.url + 'get-appointments-for-specific-date', getAppointmentsForSpecificDateRequest, {
      headers: this.headers,
    });
  }
}

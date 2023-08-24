import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentPost } from 'src/app/models/appointment-post';

@Injectable({
  providedIn: 'root',
})
export class AppointmentPostService {
  private url = 'http://localhost:8080/api/appointment-posts/';

  constructor(private http: HttpClient) {}

  create(appointmentPost: AppointmentPost): Observable<AppointmentPost> {
    return this.http.post<AppointmentPost>(this.url, appointmentPost);
  }
}

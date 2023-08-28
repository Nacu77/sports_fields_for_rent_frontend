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

  getAllAppointmentPostsWithFreeSlots(): Observable<Array<AppointmentPost>> {
    return this.http.get<Array<AppointmentPost>>(this.url + 'get-all-appointment-posts-with-free-slots');
  }

  update(appointmentPost: AppointmentPost): Observable<AppointmentPost> {
    return this.http.put<AppointmentPost>(this.url, appointmentPost);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.url + id);
  }

  getAppointmentPostsForSpecificUser(username: string): Observable<Array<AppointmentPost>> {
    return this.http.get<Array<AppointmentPost>>(this.url + 'get-appointment-posts-for-specific-user/' + username);
  }

  getAppliedAppointmentPostsForSpecificUser(username: string): Observable<Array<AppointmentPost>> {
    return this.http.get<Array<AppointmentPost>>(this.url + 'get-applied-appointment-posts-for-specific-user/' + username);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SportField } from 'src/app/models/sport-field';

@Injectable({
  providedIn: 'root',
})
export class SportFieldService {
  private url = 'http://localhost:8080/api/fields/';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:admin'),
  });

  constructor(private http: HttpClient) {}

  create(sportField: SportField): Observable<SportField> {
    return this.http.post<SportField>(this.url, sportField, {
      headers: this.headers,
    });
  }

  findAll(): Observable<Array<SportField>> {
    return this.http.get<Array<SportField>>(this.url, {
      headers: this.headers,
    });
  }
}

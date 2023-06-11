import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  create(sportField: SportField) {
    return this.http.post<SportField>(this.url, sportField, {
      headers: this.headers,
    });
  }
}

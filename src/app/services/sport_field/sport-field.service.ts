import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SportField } from 'src/app/models/sport-field';

@Injectable({
  providedIn: 'root',
})
export class SportFieldService {
  private url = 'http://localhost:8080/api/fields/';

  constructor(private http: HttpClient) {}

  create(sportField: SportField): Observable<SportField> {
    return this.http.post<SportField>(this.url, sportField);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.url + id);
  }

  findAll(): Observable<Array<SportField>> {
    return this.http.get<Array<SportField>>(this.url);
  }

  findById(id: string): Observable<SportField> {
    return this.http.get<SportField>(this.url + id);
  }

  update(sportField: SportField): Observable<SportField> {
    return this.http.put<SportField>(this.url, sportField);
  }

  findAllByUser(username: string): Observable<Array<SportField>> {
    return this.http.get<Array<SportField>>(this.url + 'specific/' + username);
  }
}

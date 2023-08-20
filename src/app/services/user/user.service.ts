import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<void> {
    return this.http.post<void>(this.url + 'register', user);
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(this.url + 'login', null, {
      headers: {
        Authorization: 'Basic ' + window.btoa(username + ':' + password),
      },
      responseType: 'text' as const,
    });
  }

  logout() {
    sessionStorage.removeItem('app.token');
    sessionStorage.removeItem('app.roles');
    sessionStorage.removeItem('app.username');
  }

  getProfile(username: string): Observable<User> {
    return this.http.get<User>(this.url + username);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('app.token') != null;
  }

  getUsername(): string | null {
    return sessionStorage.getItem('app.username');
  }

  isUserInRole(roleFromRoute: string) {
    const roles = sessionStorage.getItem('app.roles');

    if (roles!.includes(',')) {
      if (roles === roleFromRoute) {
        return true;
      }
    } else {
      const roleArray = roles!.split(',');
      for (let role of roleArray) {
        if (role === roleFromRoute) {
          return true;
        }
      }
    }
    return false;
  }
}

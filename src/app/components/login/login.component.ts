import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  badCredentials: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    this.userService.login(this.username, this.password).subscribe({
      next: (token) => {
        sessionStorage.setItem('app.token', token);
        const decodedToken = jwtDecode<JwtPayload>(token);
        // @ts-ignore
        sessionStorage.setItem('app.roles', decodedToken.scope);
        // @ts-ignore
        sessionStorage.setItem('app.username', decodedToken.sub);
        this.router.navigateByUrl('/');
      },
      error: (_error) => (this.badCredentials = true),
    });
  }
}

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { UserService } from 'src/app/services/user/user.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  badCredentials: boolean = false;

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  login(): void {
    if (this.userService.isLoggedIn()) {
      this.userService.logout();
    }

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

  resetPassword(): void {
    this.userService.resetPassword(this.username).subscribe({
      next: () => {
        savedChangesSnackBar('An email was sent to this account address', this.snackBar);
      },
      error: (_error) => {
        savedChangesSnackBar('Error sending the email, please check the username', this.snackBar);
      },
    });
  }
}

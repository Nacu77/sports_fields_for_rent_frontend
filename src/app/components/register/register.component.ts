import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  } as User;

  errorsMap: Map<string, string>;

  roles: Map<string, string>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.setRoles();
  }

  register() {
    this.userService.register(this.user).subscribe({
      next: () => {
        this.errorsMap = new Map<string, string>();
        this.router.navigateByUrl('/login');
      },
      error: (e: HttpErrorResponse) => {
        this.errorsMap = new Map<string, string>();
        e.error.errors.forEach((err: { field: string; defaultMessage: string }) => {
          this.errorsMap.set(err.field, err.defaultMessage);
        });
      },
    });
  }

  private setRoles() {
    this.roles = new Map();

    const roleKeys = Object.keys(Role);
    const roleValues = Object.values(Role);

    for (let i = 0; i < roleKeys.length; i++) {
      if (roleValues[i] == Role.ADMIN) {
        continue;
      }
      this.roles.set(roleKeys[i], roleValues[i]);
    }
  }
}

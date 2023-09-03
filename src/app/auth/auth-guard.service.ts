import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn()) {
      if (next.routeConfig?.data?.['authenticated']) {
        return true;
      }

      if (this.userService.isUserInRole('ADMIN')) {
        return true;
      }

      if (this.userService.isUserInRole(next.routeConfig?.data?.['role'])) {
        return true;
      }
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}

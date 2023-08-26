import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

enum ProfileOptions {
  CURRENT_APPOINTMENTS,
  APPOINTMENTS_HISTORY,
  APPOINTMENT_POSTS,
  APPLIED_POSTS,
  OWNED_FIELDS,
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  selectedOption: ProfileOptions = ProfileOptions.CURRENT_APPOINTMENTS;
  ProfileOptionsType = ProfileOptions;

  isScreenSmall: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const username = this.userService.getUsername();
    if (username) {
      this.userService.getProfile(username).subscribe((user) => (this.user = user));
    }
  }

  showCurrentAppointments(): void {
    this.selectedOption = ProfileOptions.CURRENT_APPOINTMENTS;
  }

  showAppointmentsHistory(): void {
    this.selectedOption = ProfileOptions.APPOINTMENTS_HISTORY;
  }

  showAppointmentPosts(): void {
    this.selectedOption = ProfileOptions.APPOINTMENT_POSTS;
  }

  showAppliedPosts(): void {
    this.selectedOption = ProfileOptions.APPLIED_POSTS;
  }

  showOwnedFields(): void {
    this.selectedOption = ProfileOptions.OWNED_FIELDS;
  }

  displayOwnedFields(): boolean {
    return this.userService.isUserInRole('OWNER');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 700) {
      this.isScreenSmall = true;
    } else {
      this.isScreenSmall = false;
    }
  }
}

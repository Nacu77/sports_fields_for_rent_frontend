import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

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
  profileLoaded: boolean = false;

  constructor(private userService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const username = this.userService.getUsername();
    if (username) {
      this.userService.getProfile(username).subscribe((user) => {
        this.user = user;
        this.profileLoaded = true;
      });
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

  openEditProfileDialog(): void {
    let user = { ...this.user };
    user.password = undefined;

    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: { user: user, password: this.user.password },
      minWidth: '30%',
    });

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        this.user = updatedUser;
        savedChangesSnackBar('Profile edited successfully', this.snackBar);
      }
    });
  }
}

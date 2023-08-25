import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

@Component({
  selector: 'app-appointment-posts',
  templateUrl: './appointment-posts.component.html',
  styleUrls: ['./appointment-posts.component.css'],
})
export class AppointmentPostsComponent implements OnInit {
  appointmentPosts: Array<AppointmentPost>;

  constructor(private appointmentPostService: AppointmentPostService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.appointmentPostService.findAll().subscribe((appointmentPosts) => (this.appointmentPosts = appointmentPosts));
  }

  onAppliedAppointmentPost(appointmentPost: AppointmentPost): void {
    this.appointmentPostService.update(appointmentPost).subscribe({
      next: () => {
        this.router.navigateByUrl('/profile');
        savedChangesSnackBar('Applied successfully to appointment post', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while applying to appointment post', this.snackBar);
      },
    });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

@Component({
  selector: 'app-profile-appointment-posts',
  templateUrl: './profile-appointment-posts.component.html',
  styleUrls: ['./profile-appointment-posts.component.css'],
})
export class ProfileAppointmentPostsComponent implements OnInit {
  @Input() username: string;

  appointmentPosts: Array<AppointmentPost>;

  private appointmentPostToDelete: AppointmentPost;

  constructor(private appointmentPostService: AppointmentPostService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAppointmentPosts();
  }

  onPrepareDeleteAppointmentPost(appointmentPost: AppointmentPost): void {
    this.appointmentPostToDelete = appointmentPost;
  }

  onDeleteAppointmentPost(): void {
    this.appointmentPostService.delete(this.appointmentPostToDelete.id).subscribe({
      next: () => {
        this.appointmentPosts = this.appointmentPosts.filter((appointmentPost) => appointmentPost.id !== this.appointmentPostToDelete.id);
        savedChangesSnackBar('Appointment Post deleted successfully', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while deleting appointment post', this.snackBar);
      },
    });
  }

  onAppointmentPostUpdated(): void {
    this.getAppointmentPosts();
  }

  private getAppointmentPosts(): void {
    this.appointmentPostService
      .getAppointmentPostsForSpecificUser(this.username)
      .subscribe((appointmentPosts) => (this.appointmentPosts = appointmentPosts));
  }
}

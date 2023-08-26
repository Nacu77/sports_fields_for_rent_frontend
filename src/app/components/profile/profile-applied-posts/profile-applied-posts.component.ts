import { Component, Input } from '@angular/core';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';

@Component({
  selector: 'app-profile-applied-posts',
  templateUrl: './profile-applied-posts.component.html',
  styleUrls: ['./profile-applied-posts.component.css'],
})
export class ProfileAppliedPostsComponent {
  @Input() username: string;

  appointmentPosts: Array<AppointmentPost>;

  constructor(private appointmentPostService: AppointmentPostService) {}

  ngOnInit(): void {
    this.getAppliedAppointmentPosts();
  }

  onAppointmentPostUpdated(): void {
    this.getAppliedAppointmentPosts();
  }

  private getAppliedAppointmentPosts(): void {
    this.appointmentPostService
      .getAppliedAppointmentPostsForSpecificUser(this.username)
      .subscribe((appointmentPosts) => (this.appointmentPosts = appointmentPosts));
  }
}

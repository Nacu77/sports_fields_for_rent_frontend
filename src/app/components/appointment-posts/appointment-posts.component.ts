import { Component, OnInit } from '@angular/core';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';

@Component({
  selector: 'app-appointment-posts',
  templateUrl: './appointment-posts.component.html',
  styleUrls: ['./appointment-posts.component.css'],
})
export class AppointmentPostsComponent implements OnInit {
  appointmentPosts: Array<AppointmentPost>;

  constructor(private appointmentPostService: AppointmentPostService) {}

  ngOnInit(): void {
    this.appointmentPostService.findAll().subscribe((appointmentPosts) => (this.appointmentPosts = appointmentPosts));
  }
}

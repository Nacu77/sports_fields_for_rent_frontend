import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentPost } from 'src/app/models/appointment-post';
import { AppointmentPostService } from 'src/app/services/appointment_post/appointment-post.service';

@Component({
  selector: 'app-appointment-posts',
  templateUrl: './appointment-posts.component.html',
  styleUrls: ['./appointment-posts.component.css'],
})
export class AppointmentPostsComponent implements OnInit {
  appointmentPosts: Array<AppointmentPost>;

  constructor(private appointmentPostService: AppointmentPostService, private router: Router) {}

  ngOnInit(): void {
    this.appointmentPostService.findAll().subscribe((appointmentPosts) => (this.appointmentPosts = appointmentPosts));
  }

  onAppointmentPostUpdated(): void {
    this.router.navigateByUrl('/profile');
  }
}

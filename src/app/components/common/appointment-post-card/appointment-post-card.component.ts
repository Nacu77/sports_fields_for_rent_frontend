import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppointmentPost } from 'src/app/models/appointment-post';

@Component({
  selector: 'app-appointment-post-card',
  templateUrl: './appointment-post-card.component.html',
  styleUrls: ['./appointment-post-card.component.css'],
})
export class AppointmentPostCardComponent {
  @Input() appointmentPost: AppointmentPost;

  @Output() prepareDeleteAppointmentPost = new EventEmitter<AppointmentPost>();
  @Output() deleteAppointmentPost = new EventEmitter<void>();

  onPrepareCancelAppointmentPost(): void {
    this.prepareDeleteAppointmentPost.emit(this.appointmentPost);
  }

  onCancelAppointmentPost(): void {
    this.deleteAppointmentPost.emit();
  }
}

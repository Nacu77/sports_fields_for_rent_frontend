import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent {
  @Input() appointment: Appointment;

  @Output() cancelAppointment = new EventEmitter<Appointment>();

  onCancelAppointment(): void {
    this.cancelAppointment.emit(this.appointment);
  }
}

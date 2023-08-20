import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent {
  @Input() appointment: Appointment;
  @Input() isCurrent: boolean;
  @Input() forProfile: boolean;

  @Output() prepareCancelAppointment = new EventEmitter<Appointment>();
  @Output() cancelAppointment = new EventEmitter<void>();

  onPrepareCancelAppointment(): void {
    this.prepareCancelAppointment.emit(this.appointment);
  }

  onCancelAppointment(): void {
    this.cancelAppointment.emit();
  }
}

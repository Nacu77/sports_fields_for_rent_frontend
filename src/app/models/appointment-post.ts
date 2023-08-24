import { Appointment } from './appointment';

export interface AppointmentPost {
  id: string;
  appointment: Appointment;
  slots: number;
  applicants: Array<string>;
}

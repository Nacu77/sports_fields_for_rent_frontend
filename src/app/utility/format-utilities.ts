import { Appointment } from '../models/appointment';
import { Schedule } from '../models/schedule';

export function formatSchedule(schedule: Schedule): void {
  if (schedule) {
    let property: keyof typeof schedule;

    for (property in schedule) {
      if (schedule[property]) {
        schedule[property] = schedule[property]?.slice(0, -3);
      }
    }
  }
}

export function formatAppointments(appointments: Array<Appointment>): void {
  appointments.forEach((appointment) => {
    appointment.startDateTime = appointment.startDateTime.replace('T', ' ').slice(0, -3);
    appointment.endDateTime = appointment.endDateTime.replace('T', ' ').slice(0, -3);
  });
}

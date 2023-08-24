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

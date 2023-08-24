import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAppointmentDate',
})
export class FormatAppointmentDatePipe implements PipeTransform {
  transform(date: string): string {
    return date.replace('T', ' ').slice(0, -3);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatAppointmentDate',
})
export class FormatAppointmentDatePipe implements PipeTransform {
  transform(date: string, pattern?: string): string {
    if (!pattern) {
      pattern = 'YYYY-MM-DD HH:mm';
    }
    return moment(date, 'YYYY-MM-DDTHH:mm:ss').format(pattern);
  }
}

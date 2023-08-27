import { Component, Input } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  @Input() schedule: Schedule | undefined;
}

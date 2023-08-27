import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SportField } from 'src/app/models/sport-field';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-specific-sport-field-schedule',
  templateUrl: './specific-sport-field-schedule.component.html',
  styleUrls: ['./specific-sport-field-schedule.component.css'],
})
export class SpecificSportFieldScheduleComponent {
  @Input() sportField: SportField;

  @Output() scheduleChange = new EventEmitter<Schedule>();

  constructor(public dialog: MatDialog) {}

  openScheduleDialog(): void {
    let schedule = { ...this.sportField.schedule };
    if (!schedule) {
      schedule = {};
    }

    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      data: { schedule: schedule },
    });

    dialogRef.afterClosed().subscribe((newSchedule) => {
      if (newSchedule) {
        this.scheduleChange.emit(newSchedule);
      }
    });
  }
}

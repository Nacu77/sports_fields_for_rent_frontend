import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css'],
})
export class ScheduleDialogComponent {
  invalidMessage: string | undefined = undefined;

  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data.schedule);
  }

  isScheduleValid(): boolean {
    const schedule: Schedule = this.data.schedule;

    return (
      this.isValid(schedule.mondayStart, schedule.mondayEnd, 'monday') &&
      this.isValid(schedule.tuesdayStart, schedule.tuesdayEnd, 'tuesday') &&
      this.isValid(schedule.wednesdayStart, schedule.wednesdayEnd, 'wednesday') &&
      this.isValid(schedule.thursdayStart, schedule.thursdayEnd, 'thursday') &&
      this.isValid(schedule.fridayStart, schedule.fridayEnd, 'friday') &&
      this.isValid(schedule.saturdayStart, schedule.saturdayEnd, 'saturday') &&
      this.isValid(schedule.sundayStart, schedule.sundayEnd, 'sunday')
    );
  }

  private isValid(startTime: string | undefined, endTime: string | undefined, day: string): boolean {
    // check start time before end time when both are set
    if (startTime && endTime) {
      this.invalidMessage =
        moment(startTime, 'hh:mm').toDate() >= moment(endTime, 'hh:mm').toDate()
          ? day + ' start time must be before ' + day + ' end time!'
          : undefined;
    }
    // if both are not set then do nothing
    else if (!startTime && !endTime) {
      this.invalidMessage = undefined;
    }
    // check if what time is not set when the other is set
    else if (!startTime) {
      this.invalidMessage = day + ' start time is mandatory when ' + day + ' end time is set!';
    } else {
      this.invalidMessage = day + ' end time is mandatory when ' + day + ' start time is set!';
    }

    return this.invalidMessage === undefined;
  }
}

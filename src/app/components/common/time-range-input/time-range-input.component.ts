import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-time-range-input',
  templateUrl: './time-range-input.component.html',
  styleUrls: ['./time-range-input.component.css'],
})
export class TimeRangeInputComponent {
  @Input() dayLabel: string;

  @Input() startTime?: Date;
  @Output() startTimeChange = new EventEmitter<Date>();

  @Input() endTime?: Date;
  @Output() endTimeChange = new EventEmitter<Date>();

  onStartTimeChange(): void {
    this.startTimeChange.emit(this.startTime);
  }

  onEndTimeChange(): void {
    this.endTimeChange.emit(this.endTime);
  }

  onReset(): void {
    this.startTime = undefined;
    this.endTime = undefined;
    this.onStartTimeChange();
    this.onEndTimeChange();
  }
}

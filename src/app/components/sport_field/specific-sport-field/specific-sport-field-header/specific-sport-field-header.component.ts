import { Component, Input } from '@angular/core';
import { SportField } from 'src/app/models/sport-field';

@Component({
  selector: 'app-specific-sport-field-header',
  templateUrl: './specific-sport-field-header.component.html',
  styleUrls: ['./specific-sport-field-header.component.css'],
})
export class SpecificSportFieldHeaderComponent {
  @Input() sportField: SportField;
  @Input() isScheduleSet: boolean;
}

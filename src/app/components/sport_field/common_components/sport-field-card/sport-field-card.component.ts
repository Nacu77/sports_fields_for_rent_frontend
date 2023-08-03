import { Component, Input } from '@angular/core';
import { SportField } from 'src/app/models/sport-field';

@Component({
  selector: 'app-sport-field-card',
  templateUrl: './sport-field-card.component.html',
  styleUrls: ['./sport-field-card.component.css'],
})
export class SportFieldCardComponent {
  @Input() sportField: SportField;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SportField } from 'src/app/models/sport-field';

@Component({
  selector: 'app-sport-field-card',
  templateUrl: './sport-field-card.component.html',
  styleUrls: ['./sport-field-card.component.css'],
})
export class SportFieldCardComponent {
  @Input() sportField: SportField;
  @Input() forProfile: boolean;

  @Output() prepareDeleteField = new EventEmitter<SportField>();
  @Output() deleteField = new EventEmitter<void>();

  onPrepareDeleteField(): void {
    this.prepareDeleteField.emit(this.sportField);
  }

  onDeleteField(): void {
    this.deleteField.emit();
  }
}

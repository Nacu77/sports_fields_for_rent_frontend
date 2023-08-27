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

  getHeaderImage(): string {
    switch (this.sportField.type?.toString()) {
      case 'FOOTBALL':
        return '../../../../../assets/images/header_football_image.jpg';
      case 'BASKETBALL':
        return '../../../../../assets/images/header_basketball_image.jpg';
      case 'TENNIS':
        return '../../../../../assets/images/header_tennis_image.jpg';
      default:
        return '';
    }
  }

  openEditFieldHeader(): void {}
}

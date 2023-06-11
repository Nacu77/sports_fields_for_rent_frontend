import { Component } from '@angular/core';
import { Address } from 'src/app/models/address';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';

@Component({
  selector: 'app-new-sport-field-form',
  templateUrl: './new-sport-field-form.component.html',
  styleUrls: ['./new-sport-field-form.component.css'],
})
export class NewSportFieldFormComponent {
  sportField = { address: {} as Address } as SportField;

  constructor(private sportFieldService: SportFieldService) {}

  newSportField() {
    this.sportFieldService
      .create(this.sportField)
      .subscribe((sportFieldResponse: SportField) => {
        console.log(sportFieldResponse);
      });
  }
}

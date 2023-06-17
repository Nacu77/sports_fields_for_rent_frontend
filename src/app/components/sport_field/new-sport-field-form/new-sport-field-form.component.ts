import { HttpErrorResponse } from '@angular/common/http';
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
  sportField = {
    name: '',
    address: {
      country: '',
      city: '',
      street: '',
    } as Address,
  } as SportField;

  errorsMap: Map<string, string>;

  constructor(private sportFieldService: SportFieldService) {}

  newSportField() {
    console.log(this.sportField);

    this.sportFieldService.create(this.sportField).subscribe({
      next: () => {
        this.errorsMap = new Map<string, string>();
        console.log('Success!');
      },
      error: (e: HttpErrorResponse) => {
        this.errorsMap = new Map<string, string>();
        e.error.errors.forEach((err: { field: string; defaultMessage: string }) => {
          this.errorsMap.set(err.field, err.defaultMessage);
        });
      },
    });
  }
}

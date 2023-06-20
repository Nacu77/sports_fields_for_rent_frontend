import { Component, OnInit } from '@angular/core';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.css'],
})
export class SportFieldsComponent implements OnInit {
  sportFields: Array<SportField> = new Array<SportField>();
  isFilterOpen: boolean = false;
  sportFieldsLoaded: boolean = false;

  constructor(private sportFieldService: SportFieldService) {}

  ngOnInit(): void {
    this.sportFieldService.findAll().subscribe((sportFields) => {
      this.sportFields = sportFields;
      this.sportFieldsLoaded = true;
    });
  }
}

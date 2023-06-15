import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Address } from 'src/app/models/address';
import { SportField } from 'src/app/models/sport-field';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.css'],
})
export class SportFieldsComponent implements AfterViewChecked {
  sportField: SportField = {
    name: 'Scoala Sportiva',
    address: {} as Address,
  } as SportField;

  sideNavOpened: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}

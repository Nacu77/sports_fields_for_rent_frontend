import { Component, OnInit } from '@angular/core';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterAndSortDialogComponent } from './filter-and-sort-dialog/filter-and-sort-dialog.component';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.css'],
})
export class SportFieldsComponent implements OnInit {
  sportFields: Array<SportField> = new Array<SportField>();
  sportFieldsLoaded: boolean = false;
  filterAndSortOptions: any = {};

  constructor(private sportFieldService: SportFieldService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sportFieldService.findAll().subscribe((sportFields) => {
      this.sportFields = sportFields;
      this.sportFieldsLoaded = true;
    });
  }

  openFilterAndSortDialog(): void {
    let filterAndSortOptions = { ...this.filterAndSortOptions };
    if (!filterAndSortOptions) {
      filterAndSortOptions = {};
    }

    const dialogRef = this.dialog.open(FilterAndSortDialogComponent, {
      data: { filterAndSortOptions: filterAndSortOptions },
    });

    dialogRef.afterClosed().subscribe((newFilterAndSortOptions) => {
      if (newFilterAndSortOptions) {
        for (let option in newFilterAndSortOptions) {
          if (newFilterAndSortOptions[option]) {
            this.filterAndSortOptions[option] = newFilterAndSortOptions[option];
          } else {
            this.removeFilterOption(option);
          }
        }
      }
    });
  }

  removeFilterOption(option: any): void {
    delete this.filterAndSortOptions[option];
  }
}

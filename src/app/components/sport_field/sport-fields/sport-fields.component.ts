import { Component, OnInit } from '@angular/core';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterAndSortFieldsDialogComponent } from './filter-and-sort-fields-dialog/filter-and-sort-fields-dialog.component';
import { GetFilteredFieldsRequest } from 'src/app/models/requests/get-filtered-fields-request';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sport-fields',
  templateUrl: './sport-fields.component.html',
  styleUrls: ['./sport-fields.component.css'],
})
export class SportFieldsComponent implements OnInit {
  sportFields: Array<SportField> = new Array<SportField>();
  sportFieldsLoaded: boolean = false;
  filterAndSortOptions: any = {};
  searchName: string;

  private fieldToDelete: SportField;

  constructor(private sportFieldService: SportFieldService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllFields();
  }

  openFilterAndSortDialog(): void {
    let filterAndSortOptions = { ...this.filterAndSortOptions };
    if (!filterAndSortOptions) {
      filterAndSortOptions = {};
    }

    const dialogRef = this.dialog.open(FilterAndSortFieldsDialogComponent, {
      data: { filterAndSortOptions: filterAndSortOptions },
    });

    dialogRef.afterClosed().subscribe((newFilterAndSortOptions) => {
      if (newFilterAndSortOptions) {
        for (let option in newFilterAndSortOptions) {
          if (newFilterAndSortOptions[option]) {
            this.filterAndSortOptions[option] = newFilterAndSortOptions[option];
          } else {
            delete this.filterAndSortOptions[option];
          }
        }
        this.getFilteredFields(false);
      }
    });
  }

  removeFilterOption(option: any): void {
    delete this.filterAndSortOptions[option];
    this.getFilteredFields(false);
  }

  onSearch(): void {
    if (this.searchName) {
      this.getFilteredFields(true);
    }
    this.searchName = '';
  }

  onReset(): void {
    this.searchName = '';
    this.filterAndSortOptions = {};
    this.getAllFields();
  }

  private getAllFields(): void {
    this.sportFieldService.findAll().subscribe((sportFields) => {
      this.sportFields = sportFields;
      this.sportFieldsLoaded = true;
    });
  }

  private getFilteredFields(forSearch: boolean): void {
    this.sportFieldsLoaded = false;

    const getFilteredFieldsRequest = {
      minPrice: this.filterAndSortOptions['minPrice'],
      maxPrice: this.filterAndSortOptions['maxPrice'],
      country: this.filterAndSortOptions['country'],
      city: this.filterAndSortOptions['city'],
      name: forSearch ? this.searchName : undefined,
      type: this.filterAndSortOptions['type'],
    } as GetFilteredFieldsRequest;

    this.sportFieldService.getFilteredFields(getFilteredFieldsRequest).subscribe((sportFields) => {
      this.sportFields = sportFields;
      this.sportFieldsLoaded = true;
    });
  }

  onPrepareDeleteField(sportField: SportField): void {
    this.fieldToDelete = sportField;
  }

  onDeleteField(): void {
    this.sportFieldService.delete(this.fieldToDelete.id).subscribe({
      next: () => {
        this.sportFields = this.sportFields.filter((ownedField) => ownedField.id !== this.fieldToDelete.id);
        savedChangesSnackBar('Field deleted successfully', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while deleting field', this.snackBar);
      },
    });
  }
}

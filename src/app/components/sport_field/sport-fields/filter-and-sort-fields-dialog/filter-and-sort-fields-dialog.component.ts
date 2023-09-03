import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SportFieldType } from 'src/app/models/sport-field';

@Component({
  selector: 'app-filter-and-sort-fields-dialog',
  templateUrl: './filter-and-sort-fields-dialog.component.html',
  styleUrls: ['./filter-and-sort-fields-dialog.component.css'],
})
export class FilterAndSortFieldsDialogComponent {
  invalidMessage: string | undefined = undefined;

  sortAsc: boolean = true;

  constructor(public dialogRef: MatDialogRef<FilterAndSortFieldsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data.filterAndSortOptions);
  }

  getTypes(): Map<string, string> {
    let types = new Map();

    const roleKeys = Object.keys(SportFieldType);
    const roleValues = Object.values(SportFieldType);

    for (let i = 0; i < roleKeys.length; i++) {
      types.set(roleKeys[i], roleValues[i]);
    }

    return types;
  }

  areFilterOptionsValid(): boolean {
    const filterAndSortOptions = this.data.filterAndSortOptions;
    const numberRegex: RegExp = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;

    if (filterAndSortOptions.minPrice && !numberRegex.test(filterAndSortOptions.minPrice)) {
      this.invalidMessage = 'Min price invalid';
      return false;
    }

    if (filterAndSortOptions.maxPrice && !numberRegex.test(filterAndSortOptions.maxPrice)) {
      this.invalidMessage = 'Max price invalid';
      return false;
    }

    if (filterAndSortOptions.minPrice > filterAndSortOptions.maxPrice) {
      this.invalidMessage = 'Min price must be lower or equal to max price';
      return false;
    }

    this.invalidMessage = undefined;
    return true;
  }
}

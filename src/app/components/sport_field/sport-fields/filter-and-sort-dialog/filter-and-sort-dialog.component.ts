import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-and-sort-dialog',
  templateUrl: './filter-and-sort-dialog.component.html',
  styleUrls: ['./filter-and-sort-dialog.component.css'],
})
export class FilterAndSortDialogComponent {
  invalidMessage: string | undefined = undefined;

  constructor(public dialogRef: MatDialogRef<FilterAndSortDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data.filterAndSortOptions);
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

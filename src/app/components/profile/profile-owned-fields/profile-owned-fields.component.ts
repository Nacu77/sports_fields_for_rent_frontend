import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

@Component({
  selector: 'app-profile-owned-fields',
  templateUrl: './profile-owned-fields.component.html',
  styleUrls: ['./profile-owned-fields.component.css'],
})
export class ProfileOwnedFieldsComponent implements OnInit {
  @Input() username: string;

  ownedFields: Array<SportField>;
  loaded: boolean = false;

  private fieldToDelete: SportField;

  constructor(private sportFieldService: SportFieldService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sportFieldService.findAllByUser(this.username).subscribe((sportFields) => {
      this.ownedFields = sportFields;
      this.loaded = true;
    });
  }

  onPrepareDeleteField(sportField: SportField): void {
    this.fieldToDelete = sportField;
  }

  onDeleteField(): void {
    this.sportFieldService.delete(this.fieldToDelete.id).subscribe({
      next: () => {
        this.ownedFields = this.ownedFields.filter((ownedField) => ownedField.id !== this.fieldToDelete.id);
        savedChangesSnackBar('Field deleted successfully', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while deleting field', this.snackBar);
      },
    });
  }
}

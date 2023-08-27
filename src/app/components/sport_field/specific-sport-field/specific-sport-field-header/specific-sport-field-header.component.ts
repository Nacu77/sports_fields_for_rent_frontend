import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SportField } from 'src/app/models/sport-field';
import { EditFieldHeaderDialogComponent } from './edit-field-header-dialog/edit-field-header-dialog.component';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specific-sport-field-header',
  templateUrl: './specific-sport-field-header.component.html',
  styleUrls: ['./specific-sport-field-header.component.css'],
})
export class SpecificSportFieldHeaderComponent {
  @Input() sportField: SportField;
  @Input() isScheduleSet: boolean;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

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

  openEditFieldHeader(): void {
    let sportField = { ...this.sportField };
    sportField.address = { ...this.sportField.address };

    const dialogRef = this.dialog.open(EditFieldHeaderDialogComponent, {
      data: { sportField: sportField },
      minWidth: '40%',
    });

    dialogRef.afterClosed().subscribe((updatedSportField) => {
      if (updatedSportField) {
        this.sportField = updatedSportField;
        savedChangesSnackBar('Field edited successfully', this.snackBar);
      }
    });
  }
}

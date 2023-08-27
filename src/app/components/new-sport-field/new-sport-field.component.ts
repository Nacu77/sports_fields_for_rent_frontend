import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { SportField, SportFieldType } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { UserService } from 'src/app/services/user/user.service';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';

@Component({
  selector: 'app-new-sport-field',
  templateUrl: './new-sport-field.component.html',
  styleUrls: ['./new-sport-field.component.css'],
})
export class NewSportFieldComponent implements OnInit {
  sportField = {
    name: '',
    address: {
      country: '',
      city: '',
      street: '',
    } as Address,
  } as SportField;

  errorsMap: Map<string, string>;

  types: Map<string, string>;

  constructor(
    private sportFieldService: SportFieldService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setTypes();
  }

  newSportField() {
    this.sportField.createdBy = this.userService.getUsername();
    this.sportFieldService.create(this.sportField).subscribe({
      next: () => {
        savedChangesSnackBar('New sport field created successfully', this.snackBar);
        this.router.navigateByUrl('/profile');
      },
      error: (e: HttpErrorResponse) => {
        this.errorsMap = new Map<string, string>();
        e.error.errors.forEach((err: { field: string; defaultMessage: string }) => {
          this.errorsMap.set(err.field, err.defaultMessage);
        });
      },
    });
  }

  private setTypes() {
    this.types = new Map();

    const roleKeys = Object.keys(SportFieldType);
    const roleValues = Object.values(SportFieldType);

    for (let i = 0; i < roleKeys.length; i++) {
      this.types.set(roleKeys[i], roleValues[i]);
    }
  }
}

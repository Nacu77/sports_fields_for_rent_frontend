import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { formatSchedule } from 'src/app/utility/format-utilities';
import { Schedule } from 'src/app/models/schedule';
import { savedChangesSnackBar } from 'src/app/utility/snackbar-utilities';
import { shouldElementDisplay } from 'src/app/utility/auth-utilities';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-specific-sport-field',
  templateUrl: './specific-sport-field.component.html',
  styleUrls: ['./specific-sport-field.component.css'],
})
export class SpecificSportFieldComponent implements OnInit {
  sportField: SportField;

  constructor(
    private sportFieldService: SportFieldService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sportFieldService.findById(params['id']).subscribe((sportField) => {
        this.sportField = sportField;
        formatSchedule(this.sportField.schedule);
      });
    });
  }

  isScheduleSet(): boolean {
    if (this.sportField?.schedule) {
      let property: keyof typeof this.sportField.schedule;

      for (property in this.sportField.schedule) {
        if (this.sportField.schedule[property]) {
          return true;
        }
      }
    }

    return false;
  }

  onScheduleChanged(schedule: Schedule): void {
    this.sportField.schedule = schedule;
    this.sportFieldService.update(this.sportField).subscribe({
      next: () => {
        savedChangesSnackBar('New schedule saved', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while saving schedule', this.snackBar);
      },
    });
  }

  onLocationChanged(sportField: SportField): void {
    this.sportField = sportField;
    this.sportFieldService.update(this.sportField).subscribe({
      next: () => {
        savedChangesSnackBar('New location marker saved', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while saving location marker', this.snackBar);
      },
    });
  }

  onImagesChange(message: string): void {
    savedChangesSnackBar(message, this.snackBar);
  }

  onPrimaryImageChange(imageName: string): void {
    this.sportField.primaryImageName = imageName;
    this.sportFieldService.update(this.sportField).subscribe({
      next: () => {
        savedChangesSnackBar('New primary image saved', this.snackBar);
      },
      error: (_e: HttpErrorResponse) => {
        savedChangesSnackBar('Error while saving primary image', this.snackBar);
      },
    });
  }

  shouldElementDisplay(): boolean {
    return shouldElementDisplay(this.userService, this.sportField.createdBy);
  }
}

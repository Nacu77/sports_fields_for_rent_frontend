import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { formatSchedule } from 'src/app/utility/format-utilities';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-specific-sport-field',
  templateUrl: './specific-sport-field.component.html',
  styleUrls: ['./specific-sport-field.component.css'],
})
export class SpecificSportFieldComponent implements OnInit {
  sportField: SportField;

  constructor(private sportFieldService: SportFieldService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

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
        this.savedChangesSnackBar('New schedule saved');
      },
      error: (_e: HttpErrorResponse) => {
        this.savedChangesSnackBar('Error while saving schedule');
      },
    });
  }

  onLocationChanged(sportField: SportField): void {
    this.sportField = sportField;
    this.sportFieldService.update(this.sportField).subscribe({
      next: () => {
        this.savedChangesSnackBar('New location marker saved');
      },
      error: (_e: HttpErrorResponse) => {
        this.savedChangesSnackBar('Error while saving location marker');
      },
    });
  }

  private savedChangesSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Appointment } from 'src/app/models/appointment';
import { Schedule } from 'src/app/models/schedule';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { formatSchedule } from 'src/app/utility/format-utilities';

@Component({
  selector: 'app-rent-sport-field',
  templateUrl: './rent-sport-field.component.html',
  styleUrls: ['./rent-sport-field.component.css'],
})
export class RentSportFieldComponent implements OnInit {
  readonly minDate: Date = new Date();

  schedule: Schedule;
  selectedDate: Date;
  startTime: string;
  endTime: string;
  sportFieldId: string;

  errorMessage: string;
  minTime?: string;
  maxTime?: string;

  constructor(private sportFieldService: SportFieldService, private appointmentService: AppointmentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sportFieldId = params['id'];
      this.sportFieldService.findById(params['id']).subscribe((sportField) => {
        this.schedule = sportField.schedule;
        formatSchedule(this.schedule);
      });
    });
  }

  onRentClicked(): void {
    let appointment = {} as Appointment;

    appointment.startDateTime = moment(this.selectedDate)
      .hour(Number(this.startTime.substring(0, 2)))
      .minute(Number(this.startTime.substring(3, 5)))
      .format('YYYY-MM-DDTHH:mm:ss');

    appointment.endDateTime = moment(this.selectedDate)
      .hour(Number(this.endTime.substring(0, 2)))
      .minute(Number(this.endTime.substring(3, 5)))
      .format('YYYY-MM-DDTHH:mm:ss');

    appointment.sportFieldId = this.sportFieldId;

    this.appointmentService.create(appointment).subscribe((appointment) => {
      console.log(appointment);
    });
  }

  onDaySelected(): void {
    this.startTime = '';
    this.endTime = '';
    switch (moment(this.selectedDate).isoWeekday()) {
      case 1: {
        this.minTime = this.schedule.mondayStart;
        this.maxTime = this.schedule.mondayEnd;
        break;
      }
      case 2: {
        this.minTime = this.schedule.tuesdayStart;
        this.maxTime = this.schedule.thursdayEnd;
        break;
      }
      case 3: {
        this.minTime = this.schedule.wednesdayStart;
        this.maxTime = this.schedule.wednesdayEnd;
        break;
      }
      case 4: {
        this.minTime = this.schedule.thursdayStart;
        this.maxTime = this.schedule.thursdayEnd;
        break;
      }
      case 5: {
        this.minTime = this.schedule.fridayStart;
        this.maxTime = this.schedule.fridayEnd;
        break;
      }
      case 6: {
        this.minTime = this.schedule.saturdayStart;
        this.maxTime = this.schedule.saturdayEnd;
        break;
      }
      case 7: {
        this.minTime = this.schedule.sundayStart;
        this.maxTime = this.schedule.sundayEnd;
        break;
      }
    }
  }

  isAppointmentInvalid(): boolean {
    if (this.selectedDate == null) {
      this.errorMessage = 'You must pick a day';
      return true;
    }

    if (!this.minTime || !this.maxTime) {
      this.errorMessage = "Can't rent on this day";
      return true;
    }

    if (!this.startTime || !this.endTime) {
      this.errorMessage = 'You must pick the start & end time';
      return true;
    }

    if (
      moment()
        .hour(Number(this.startTime.substring(0, 2)))
        .minute(Number(this.startTime.substring(3, 5)))
        .isAfter(
          moment()
            .hour(Number(this.endTime.substring(0, 2)))
            .minute(Number(this.endTime.substring(3, 5)))
        )
    ) {
      this.errorMessage = 'Start time must be before end time';
      return true;
    }

    this.errorMessage = '';
    return false;
  }
}

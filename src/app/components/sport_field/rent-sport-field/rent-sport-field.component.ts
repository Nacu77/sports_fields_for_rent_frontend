import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Appointment } from 'src/app/models/appointment';
import { GetAppointmentsForSpecificDateRequest } from 'src/app/models/requests/get-appointments-for-specific-date-request';
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
  minTime: string;
  maxTime: string;

  currentAppointments: Array<Appointment>;

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

    appointment.startDateTime = this.selectedDateTimeToMoment(this.selectedDate, this.startTime).format('YYYY-MM-DDTHH:mm:ss');
    appointment.endDateTime = this.selectedDateTimeToMoment(this.selectedDate, this.endTime).format('YYYY-MM-DDTHH:mm:ss');
    appointment.sportFieldId = this.sportFieldId;
    appointment.createdBy = sessionStorage.getItem('app.username');

    this.appointmentService.create(appointment).subscribe((appointment) => {
      console.log(appointment);
      this.startTime = '';
      this.endTime = '';
    });
  }

  isAppointmentInvalid(): boolean {
    this.errorMessage = '';
    return !(
      this.isDaySelected() &&
      this.isScheduleSetOnSelectedDay() &&
      this.isStartAndEndTimeSelected() &&
      this.isStartTimeBeforeEndTime() &&
      this.isSelectedTimeNotInThePast() &&
      this.isSelectedTimeOnSchedule() &&
      this.isSelectedTimeNotOverlappingCurrentAppointments()
    );
  }

  onDaySelected(): void {
    this.getAppointmentsForSpecificDate();
    this.setMinAndMaxTime();
  }

  private getAppointmentsForSpecificDate(): void {
    let getAppointmentsForSpecificDateRequest: GetAppointmentsForSpecificDateRequest = {
      sportFieldId: this.sportFieldId,
      date: moment(this.selectedDate).format('YYYY-MM-DD'),
    };

    this.appointmentService.getAppointmentsForSpecificDate(getAppointmentsForSpecificDateRequest).subscribe((currentAppointments) => {
      this.currentAppointments = currentAppointments.map((appointment) => {
        appointment.startDateTime = moment(appointment.startDateTime).format('HH:mm');
        appointment.endDateTime = moment(appointment.endDateTime).format('HH:mm');
        return appointment;
      });
    });
  }

  private setMinAndMaxTime(): void {
    this.startTime = '';
    this.endTime = '';
    switch (moment(this.selectedDate).isoWeekday()) {
      case 1: {
        this.minTime = this.schedule.mondayStart ?? '';
        this.maxTime = this.schedule.mondayEnd ?? '';
        break;
      }
      case 2: {
        this.minTime = this.schedule.tuesdayStart ?? '';
        this.maxTime = this.schedule.tuesdayEnd ?? '';
        break;
      }
      case 3: {
        this.minTime = this.schedule.wednesdayStart ?? '';
        this.maxTime = this.schedule.wednesdayEnd ?? '';
        break;
      }
      case 4: {
        this.minTime = this.schedule.thursdayStart ?? '';
        this.maxTime = this.schedule.thursdayEnd ?? '';
        break;
      }
      case 5: {
        this.minTime = this.schedule.fridayStart ?? '';
        this.maxTime = this.schedule.fridayEnd ?? '';
        break;
      }
      case 6: {
        this.minTime = this.schedule.saturdayStart ?? '';
        this.maxTime = this.schedule.saturdayEnd ?? '';
        break;
      }
      case 7: {
        this.minTime = this.schedule.sundayStart ?? '';
        this.maxTime = this.schedule.sundayEnd ?? '';
        break;
      }
    }
  }

  private selectedDateTimeToMoment(selectedDate: Date, selectedTimeString: string): Moment {
    return moment(selectedDate)
      .hour(Number(selectedTimeString.substring(0, 2)))
      .minute(Number(selectedTimeString.substring(3, 5)));
  }

  private isDaySelected(): boolean {
    if (this.selectedDate == null) {
      this.errorMessage = 'You must pick a day';
      return false;
    }

    return true;
  }

  private isScheduleSetOnSelectedDay(): boolean {
    if (!this.minTime || !this.maxTime) {
      this.errorMessage = "Can't rent on this day";
      return false;
    }

    return true;
  }

  private isStartAndEndTimeSelected(): boolean {
    if (!this.startTime || !this.endTime) {
      this.errorMessage = 'You must pick the start & end time';
      return false;
    }

    return true;
  }

  private isStartTimeBeforeEndTime(): boolean {
    const selectedStartMoment = this.selectedDateTimeToMoment(this.selectedDate, this.startTime);
    const selectedEndMoment = this.selectedDateTimeToMoment(this.selectedDate, this.endTime);

    if (selectedStartMoment.isAfter(selectedEndMoment)) {
      this.errorMessage = 'Start time must be before end time';
      return false;
    }

    return true;
  }

  private isSelectedTimeNotInThePast(): boolean {
    const selectedStartMoment = this.selectedDateTimeToMoment(this.selectedDate, this.startTime);

    if (selectedStartMoment.isBefore(moment())) {
      this.errorMessage = "The selected time can't be in the past";
      return false;
    }

    return true;
  }

  private isSelectedTimeOnSchedule(): boolean {
    const selectedStartMoment = this.selectedDateTimeToMoment(this.selectedDate, this.startTime);
    const selectedEndMoment = this.selectedDateTimeToMoment(this.selectedDate, this.endTime);
    const minMoment = this.selectedDateTimeToMoment(this.selectedDate, this.minTime);
    const maxMoment = this.selectedDateTimeToMoment(this.selectedDate, this.maxTime);

    if (selectedStartMoment.isBefore(minMoment) || selectedEndMoment.isAfter(maxMoment)) {
      this.errorMessage = 'The selected time must respect the schedule';
      return false;
    }

    return true;
  }

  private isSelectedTimeNotOverlappingCurrentAppointments() {
    const selectedStartMoment = this.selectedDateTimeToMoment(this.selectedDate, this.startTime);
    const selectedEndMoment = this.selectedDateTimeToMoment(this.selectedDate, this.endTime);

    const overlapsOtherAppointment = this.currentAppointments.some((appointment) => {
      const appointmentStartMoment = this.selectedDateTimeToMoment(this.selectedDate, appointment.startDateTime);
      const appointmentEndMoment = this.selectedDateTimeToMoment(this.selectedDate, appointment.endDateTime);

      return (
        (selectedStartMoment.isSameOrAfter(appointmentStartMoment) && selectedStartMoment.isBefore(appointmentEndMoment)) ||
        (selectedEndMoment.isAfter(appointmentStartMoment) && selectedEndMoment.isSameOrBefore(appointmentEndMoment))
      );
    });

    if (overlapsOtherAppointment) {
      this.errorMessage = 'The selected time overlaps an existing appointment';
      return false;
    }

    return true;
  }
}

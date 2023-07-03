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
  schedule: Schedule;
  selectedDate: Date;
  startTime: string;
  endTime: string;
  sportFieldId: string;

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
}

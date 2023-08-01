import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewSportFieldFormComponent } from './components/sport_field/new-sport-field-form/new-sport-field-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SportFieldsComponent } from './components/sport_field/sport-fields/sport-fields.component';
import { SportFieldCardComponent } from './components/sport_field/sport-field-card/sport-field-card.component';
import { SpecificSportFieldComponent } from './components/sport_field/specific-sport-field/specific-sport-field.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScheduleDialogComponent } from './components/sport_field/schedule-dialog/schedule-dialog.component';
import { TimeRangeInputComponent } from './components/sport_field/time-range-input/time-range-input.component';
import { RentSportFieldComponent } from './components/sport_field/rent-sport-field/rent-sport-field.component';
import { ScheduleComponent } from './components/sport_field/schedule/schedule.component';
import { FilterAndSortDialogComponent } from './components/sport_field/filter-and-sort-dialog/filter-and-sort-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NewSportFieldFormComponent,
    NavbarComponent,
    HomeHeaderComponent,
    HomeComponent,
    FooterComponent,
    SportFieldsComponent,
    SportFieldCardComponent,
    SpecificSportFieldComponent,
    ScheduleDialogComponent,
    TimeRangeInputComponent,
    RentSportFieldComponent,
    ScheduleComponent,
    FilterAndSortDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    LeafletModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

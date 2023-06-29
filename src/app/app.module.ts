import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimeRangeInputComponent } from './components/sport_field/time-range-input/time-range-input.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

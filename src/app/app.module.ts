import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { NewSportFieldComponent } from './components/new-sport-field/new-sport-field.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SportFieldsComponent } from './components/sport_field/sport-fields/sport-fields.component';
import { SportFieldCardComponent } from './components/common/sport-field-card/sport-field-card.component';
import { SpecificSportFieldComponent } from './components/sport_field/specific-sport-field/specific-sport-field.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScheduleDialogComponent } from './components/sport_field/specific-sport-field/schedule-dialog/schedule-dialog.component';
import { TimeRangeInputComponent } from './components/common/time-range-input/time-range-input.component';
import { RentSportFieldComponent } from './components/rent-sport-field/rent-sport-field.component';
import { ScheduleComponent } from './components/common/schedule/schedule.component';
import { FilterAndSortDialogComponent } from './components/sport_field/sport-fields/filter-and-sort-dialog/filter-and-sort-dialog.component';
import { SpecificSportFieldHeaderComponent } from './components/sport_field/specific-sport-field/specific-sport-field-header/specific-sport-field-header.component';
import { SpecificSportFieldScheduleComponent } from './components/sport_field/specific-sport-field/specific-sport-field-schedule/specific-sport-field-schedule.component';
import { SpecificSportFieldMapComponent } from './components/sport_field/specific-sport-field/specific-sport-field-map/specific-sport-field-map.component';
import { SpecificSportFieldImagesComponent } from './components/sport_field/specific-sport-field/specific-sport-field-images/specific-sport-field-images.component';
import { RegisterComponent } from './components/register/register.component';
import { CustomInputComponent } from './components/common/custom-input/custom-input.component';
import { CustomSelectComponent } from './components/common/custom-select/custom-select.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentCardComponent } from './components/common/appointment-card/appointment-card.component';
import { CustomModalComponent } from './components/common/custom-modal/custom-modal.component';
import { ShowControlDirective } from './directives/show-control.directive';
import { SpecificSportFieldAppointmentsComponent } from './components/sport_field/specific-sport-field/specific-sport-field-appointments/specific-sport-field-appointments.component';
import { AppointmentPostDialogComponent } from './components/common/appointment-card/appointment-post-dialog/appointment-post-dialog.component';
import { FormatAppointmentDatePipe } from './pipes/format-appointment-date.pipe';
import { AppointmentPostCardComponent } from './components/common/appointment-post-card/appointment-post-card.component';
import { ProfileCurrentAppointmentsComponent } from './components/profile/profile-current-appointments/profile-current-appointments.component';
import { ProfileAppointmentsHistoryComponent } from './components/profile/profile-appointments-history/profile-appointments-history.component';
import { ProfileOwnedFieldsComponent } from './components/profile/profile-owned-fields/profile-owned-fields.component';
import { ProfileAppointmentPostsComponent } from './components/profile/profile-appointment-posts/profile-appointment-posts.component';
import { AppointmentPostsComponent } from './components/appointment-posts/appointment-posts.component';
import { ApplyAppointmentPostDialogComponent } from './components/common/appointment-post-card/apply-appointment-post-dialog/apply-appointment-post-dialog.component';
import { ApplicantsDialogComponent } from './components/common/appointment-post-card/applicants-dialog/applicants-dialog.component';
import { ProfileAppliedPostsComponent } from './components/profile/profile-applied-posts/profile-applied-posts.component';
import { NoResultsComponent } from './components/common/no-results/no-results.component';
import { LoadingComponent } from './components/common/loading/loading.component';
import { EditProfileDialogComponent } from './components/profile/edit-profile-dialog/edit-profile-dialog.component';
import { EditFieldHeaderDialogComponent } from './components/sport_field/specific-sport-field/specific-sport-field-header/edit-field-header-dialog/edit-field-header-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NewSportFieldComponent,
    NavbarComponent,
    HeaderComponent,
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
    SpecificSportFieldHeaderComponent,
    SpecificSportFieldScheduleComponent,
    SpecificSportFieldMapComponent,
    SpecificSportFieldImagesComponent,
    RegisterComponent,
    CustomInputComponent,
    CustomSelectComponent,
    LoginComponent,
    ProfileComponent,
    AppointmentCardComponent,
    CustomModalComponent,
    ShowControlDirective,
    SpecificSportFieldAppointmentsComponent,
    AppointmentPostDialogComponent,
    FormatAppointmentDatePipe,
    AppointmentPostCardComponent,
    ProfileCurrentAppointmentsComponent,
    ProfileAppointmentsHistoryComponent,
    ProfileOwnedFieldsComponent,
    ProfileAppointmentPostsComponent,
    AppointmentPostsComponent,
    ApplyAppointmentPostDialogComponent,
    ApplicantsDialogComponent,
    ProfileAppliedPostsComponent,
    NoResultsComponent,
    LoadingComponent,
    EditProfileDialogComponent,
    EditFieldHeaderDialogComponent,
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

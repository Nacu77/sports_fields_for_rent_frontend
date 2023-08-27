import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSportFieldComponent } from './components/new-sport-field/new-sport-field.component';
import { HomeComponent } from './components/home/home.component';
import { SportFieldsComponent } from './components/sport_field/sport-fields/sport-fields.component';
import { SpecificSportFieldComponent } from './components/sport_field/specific-sport-field/specific-sport-field.component';
import { RentSportFieldComponent } from './components/rent-sport-field/rent-sport-field.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AppointmentPostsComponent } from './components/appointment-posts/appointment-posts.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { authenticated: true } },
  { path: 'new-sport-field', component: NewSportFieldComponent, canActivate: [AuthGuard], data: { role: 'OWNER' } },
  { path: 'sport-fields', component: SportFieldsComponent },
  { path: 'sport-field/:id', component: SpecificSportFieldComponent },
  { path: 'sport-field/rent/:id', component: RentSportFieldComponent, canActivate: [AuthGuard], data: { authenticated: true } },
  { path: 'appointment-posts', component: AppointmentPostsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

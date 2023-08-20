import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSportFieldFormComponent } from './components/sport_field/new-sport-field-form/new-sport-field-form.component';
import { HomeComponent } from './components/home/home.component';
import { SportFieldsComponent } from './components/sport_field/sport-fields/sport-fields.component';
import { SpecificSportFieldComponent } from './components/sport_field/specific-sport-field/specific-sport-field.component';
import { RentSportFieldComponent } from './components/sport_field/rent-sport-field/rent-sport-field.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { authenticated: true } },
  { path: 'new-sport-field', component: NewSportFieldFormComponent, canActivate: [AuthGuard], data: { role: 'OWNER' } },
  { path: 'sport-fields', component: SportFieldsComponent },
  { path: 'sport-field/:id', component: SpecificSportFieldComponent },
  { path: 'sport-field/rent/:id', component: RentSportFieldComponent, canActivate: [AuthGuard], data: { authenticated: true } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

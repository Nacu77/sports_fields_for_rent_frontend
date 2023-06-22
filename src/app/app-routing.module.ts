import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSportFieldFormComponent } from './components/sport_field/new-sport-field-form/new-sport-field-form.component';
import { HomeComponent } from './components/home/home.component';
import { SportFieldsComponent } from './components/sport_field/sport-fields/sport-fields.component';
import { SpecificSportFieldComponent } from './components/sport_field/specific-sport-field/specific-sport-field.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-sport-field', component: NewSportFieldFormComponent },
  { path: 'sport-fields', component: SportFieldsComponent },
  { path: 'sport-field/:id', component: SpecificSportFieldComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

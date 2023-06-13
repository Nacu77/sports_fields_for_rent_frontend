import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSportFieldFormComponent } from './components/sport_field/new-sport-field-form/new-sport-field-form.component';
import { HomeComponent } from './components/home/home.component';
import { SportFieldsComponent } from './components/sport_field/sport-fields/sport-fields.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-sport-field', component: NewSportFieldFormComponent },
  { path: 'sport-fields', component: SportFieldsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

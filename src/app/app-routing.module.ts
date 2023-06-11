import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSportFieldFormComponent } from './components/sport_field/new-sport-field-form/new-sport-field-form.component';

const routes: Routes = [
  { path: 'new-sport-field', component: NewSportFieldFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

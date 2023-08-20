import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSportFieldAppointmentsComponent } from './specific-sport-field-appointments.component';

describe('SpecificSportFieldAppointmentsComponent', () => {
  let component: SpecificSportFieldAppointmentsComponent;
  let fixture: ComponentFixture<SpecificSportFieldAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificSportFieldAppointmentsComponent]
    });
    fixture = TestBed.createComponent(SpecificSportFieldAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

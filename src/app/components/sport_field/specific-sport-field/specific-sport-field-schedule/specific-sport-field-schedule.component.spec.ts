import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSportFieldScheduleComponent } from './specific-sport-field-schedule.component';

describe('SpecificSportFieldScheduleComponent', () => {
  let component: SpecificSportFieldScheduleComponent;
  let fixture: ComponentFixture<SpecificSportFieldScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificSportFieldScheduleComponent]
    });
    fixture = TestBed.createComponent(SpecificSportFieldScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

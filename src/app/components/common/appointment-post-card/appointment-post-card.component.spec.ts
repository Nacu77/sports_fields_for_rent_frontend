import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPostCardComponent } from './appointment-post-card.component';

describe('AppointmentPostCardComponent', () => {
  let component: AppointmentPostCardComponent;
  let fixture: ComponentFixture<AppointmentPostCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentPostCardComponent]
    });
    fixture = TestBed.createComponent(AppointmentPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

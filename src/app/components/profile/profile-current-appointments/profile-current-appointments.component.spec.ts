import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCurrentAppointmentsComponent } from './profile-current-appointments.component';

describe('ProfileCurrentAppointmentsComponent', () => {
  let component: ProfileCurrentAppointmentsComponent;
  let fixture: ComponentFixture<ProfileCurrentAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCurrentAppointmentsComponent]
    });
    fixture = TestBed.createComponent(ProfileCurrentAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

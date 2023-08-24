import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAppointmentsHistoryComponent } from './profile-appointments-history.component';

describe('ProfileAppointmentsHistoryComponent', () => {
  let component: ProfileAppointmentsHistoryComponent;
  let fixture: ComponentFixture<ProfileAppointmentsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppointmentsHistoryComponent]
    });
    fixture = TestBed.createComponent(ProfileAppointmentsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

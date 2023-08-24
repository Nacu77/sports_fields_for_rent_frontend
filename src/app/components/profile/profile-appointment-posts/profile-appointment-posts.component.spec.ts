import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAppointmentPostsComponent } from './profile-appointment-posts.component';

describe('ProfileAppointmentPostsComponent', () => {
  let component: ProfileAppointmentPostsComponent;
  let fixture: ComponentFixture<ProfileAppointmentPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppointmentPostsComponent]
    });
    fixture = TestBed.createComponent(ProfileAppointmentPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

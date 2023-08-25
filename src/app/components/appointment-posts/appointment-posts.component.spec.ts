import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPostsComponent } from './appointment-posts.component';

describe('AppointmentPostsComponent', () => {
  let component: AppointmentPostsComponent;
  let fixture: ComponentFixture<AppointmentPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentPostsComponent]
    });
    fixture = TestBed.createComponent(AppointmentPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

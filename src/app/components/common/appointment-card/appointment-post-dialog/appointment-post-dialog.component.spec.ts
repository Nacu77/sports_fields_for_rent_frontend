import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPostDialogComponent } from './appointment-post-dialog.component';

describe('AppointmentPostDialogComponent', () => {
  let component: AppointmentPostDialogComponent;
  let fixture: ComponentFixture<AppointmentPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentPostDialogComponent]
    });
    fixture = TestBed.createComponent(AppointmentPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

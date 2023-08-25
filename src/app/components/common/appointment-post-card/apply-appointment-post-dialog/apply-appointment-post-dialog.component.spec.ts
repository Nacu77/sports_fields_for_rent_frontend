import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyAppointmentPostDialogComponent } from './apply-appointment-post-dialog.component';

describe('ApplyAppointmentPostDialogComponent', () => {
  let component: ApplyAppointmentPostDialogComponent;
  let fixture: ComponentFixture<ApplyAppointmentPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyAppointmentPostDialogComponent]
    });
    fixture = TestBed.createComponent(ApplyAppointmentPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

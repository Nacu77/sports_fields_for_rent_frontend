import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangeInputComponent } from './time-range-input.component';

describe('TimeRangeInputComponent', () => {
  let component: TimeRangeInputComponent;
  let fixture: ComponentFixture<TimeRangeInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeRangeInputComponent]
    });
    fixture = TestBed.createComponent(TimeRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

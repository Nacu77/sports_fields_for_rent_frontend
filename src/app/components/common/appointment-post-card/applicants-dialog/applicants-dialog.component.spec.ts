import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsDialogComponent } from './applicants-dialog.component';

describe('ApplicantsDialogComponent', () => {
  let component: ApplicantsDialogComponent;
  let fixture: ComponentFixture<ApplicantsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantsDialogComponent]
    });
    fixture = TestBed.createComponent(ApplicantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

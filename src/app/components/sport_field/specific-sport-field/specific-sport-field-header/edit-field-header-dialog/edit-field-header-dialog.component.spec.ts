import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFieldHeaderDialogComponent } from './edit-field-header-dialog.component';

describe('EditFieldHeaderDialogComponent', () => {
  let component: EditFieldHeaderDialogComponent;
  let fixture: ComponentFixture<EditFieldHeaderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFieldHeaderDialogComponent]
    });
    fixture = TestBed.createComponent(EditFieldHeaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

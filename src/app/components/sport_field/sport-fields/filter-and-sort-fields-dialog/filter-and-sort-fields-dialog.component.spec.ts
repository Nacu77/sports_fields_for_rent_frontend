import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSortFieldsDialogComponent } from './filter-and-sort-fields-dialog.component';

describe('FilterAndSortFieldsDialogComponent', () => {
  let component: FilterAndSortFieldsDialogComponent;
  let fixture: ComponentFixture<FilterAndSortFieldsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAndSortFieldsDialogComponent]
    });
    fixture = TestBed.createComponent(FilterAndSortFieldsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

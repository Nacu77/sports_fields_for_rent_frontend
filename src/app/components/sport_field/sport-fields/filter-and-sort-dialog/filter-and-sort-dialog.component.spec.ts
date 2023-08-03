import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSortDialogComponent } from './filter-and-sort-dialog.component';

describe('FilterAndSortDialogComponent', () => {
  let component: FilterAndSortDialogComponent;
  let fixture: ComponentFixture<FilterAndSortDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAndSortDialogComponent]
    });
    fixture = TestBed.createComponent(FilterAndSortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

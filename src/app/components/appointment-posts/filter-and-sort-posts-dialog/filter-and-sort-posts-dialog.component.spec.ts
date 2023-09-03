import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSortPostsDialogComponent } from './filter-and-sort-posts-dialog.component';

describe('FilterAndSortPostsDialogComponent', () => {
  let component: FilterAndSortPostsDialogComponent;
  let fixture: ComponentFixture<FilterAndSortPostsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAndSortPostsDialogComponent]
    });
    fixture = TestBed.createComponent(FilterAndSortPostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

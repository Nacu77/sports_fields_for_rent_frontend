import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAppliedPostsComponent } from './profile-applied-posts.component';

describe('ProfileAppliedPostsComponent', () => {
  let component: ProfileAppliedPostsComponent;
  let fixture: ComponentFixture<ProfileAppliedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAppliedPostsComponent]
    });
    fixture = TestBed.createComponent(ProfileAppliedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

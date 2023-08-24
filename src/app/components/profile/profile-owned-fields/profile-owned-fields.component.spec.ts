import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOwnedFieldsComponent } from './profile-owned-fields.component';

describe('ProfileOwnedFieldsComponent', () => {
  let component: ProfileOwnedFieldsComponent;
  let fixture: ComponentFixture<ProfileOwnedFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileOwnedFieldsComponent]
    });
    fixture = TestBed.createComponent(ProfileOwnedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

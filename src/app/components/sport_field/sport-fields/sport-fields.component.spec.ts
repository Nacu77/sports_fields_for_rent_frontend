import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportFieldsComponent } from './sport-fields.component';

describe('SportFieldsComponent', () => {
  let component: SportFieldsComponent;
  let fixture: ComponentFixture<SportFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportFieldsComponent]
    });
    fixture = TestBed.createComponent(SportFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

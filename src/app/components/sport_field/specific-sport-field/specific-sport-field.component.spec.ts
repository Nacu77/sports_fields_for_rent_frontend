import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSportFieldComponent } from './specific-sport-field.component';

describe('SpecificSportFieldComponent', () => {
  let component: SpecificSportFieldComponent;
  let fixture: ComponentFixture<SpecificSportFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificSportFieldComponent]
    });
    fixture = TestBed.createComponent(SpecificSportFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

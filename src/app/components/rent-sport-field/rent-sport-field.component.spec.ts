import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentSportFieldComponent } from './rent-sport-field.component';

describe('RentSportFieldComponent', () => {
  let component: RentSportFieldComponent;
  let fixture: ComponentFixture<RentSportFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentSportFieldComponent]
    });
    fixture = TestBed.createComponent(RentSportFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

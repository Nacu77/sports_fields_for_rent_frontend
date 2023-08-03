import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSportFieldMapComponent } from './specific-sport-field-map.component';

describe('SpecificSportFieldMapComponent', () => {
  let component: SpecificSportFieldMapComponent;
  let fixture: ComponentFixture<SpecificSportFieldMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificSportFieldMapComponent]
    });
    fixture = TestBed.createComponent(SpecificSportFieldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSportFieldHeaderComponent } from './specific-sport-field-header.component';

describe('SpecificSportFieldHeaderComponent', () => {
  let component: SpecificSportFieldHeaderComponent;
  let fixture: ComponentFixture<SpecificSportFieldHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificSportFieldHeaderComponent]
    });
    fixture = TestBed.createComponent(SpecificSportFieldHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

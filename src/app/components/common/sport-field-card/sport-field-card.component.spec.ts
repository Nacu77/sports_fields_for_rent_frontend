import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportFieldCardComponent } from './sport-field-card.component';

describe('SportFieldCardComponent', () => {
  let component: SportFieldCardComponent;
  let fixture: ComponentFixture<SportFieldCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportFieldCardComponent]
    });
    fixture = TestBed.createComponent(SportFieldCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

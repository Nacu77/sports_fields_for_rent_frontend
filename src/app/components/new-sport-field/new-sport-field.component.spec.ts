import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSportFieldComponent } from './new-sport-field.component';

describe('NewSportFieldComponent', () => {
  let component: NewSportFieldComponent;
  let fixture: ComponentFixture<NewSportFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSportFieldComponent]
    });
    fixture = TestBed.createComponent(NewSportFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

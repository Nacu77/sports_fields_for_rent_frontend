import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSportFieldFormComponent } from './new-sport-field-form.component';

describe('NewSportFieldFormComponent', () => {
  let component: NewSportFieldFormComponent;
  let fixture: ComponentFixture<NewSportFieldFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSportFieldFormComponent]
    });
    fixture = TestBed.createComponent(NewSportFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

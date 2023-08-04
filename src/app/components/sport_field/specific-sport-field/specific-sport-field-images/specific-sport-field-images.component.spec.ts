import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificSportFieldImagesComponent } from './specific-sport-field-images.component';

describe('SpecificSportFieldImagesComponent', () => {
  let component: SpecificSportFieldImagesComponent;
  let fixture: ComponentFixture<SpecificSportFieldImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificSportFieldImagesComponent]
    });
    fixture = TestBed.createComponent(SpecificSportFieldImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

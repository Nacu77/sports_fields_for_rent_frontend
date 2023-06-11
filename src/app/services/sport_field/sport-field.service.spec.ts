import { TestBed } from '@angular/core/testing';

import { SportFieldService } from './sport-field.service';

describe('SportFieldService', () => {
  let service: SportFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

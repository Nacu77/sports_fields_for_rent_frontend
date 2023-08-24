import { TestBed } from '@angular/core/testing';

import { AppointmentPostService } from './appointment-post.service';

describe('AppointmentPostService', () => {
  let service: AppointmentPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

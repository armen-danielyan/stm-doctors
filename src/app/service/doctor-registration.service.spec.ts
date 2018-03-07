import { TestBed, inject } from '@angular/core/testing';

import { DoctorRegistrationService } from './doctor-registration.service';

describe('DoctorRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
  });

  it('should be created', inject([DoctorRegistrationService], (service: DoctorRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});

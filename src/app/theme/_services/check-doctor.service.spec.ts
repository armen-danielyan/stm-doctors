import { TestBed, inject } from '@angular/core/testing';

import { CheckDoctorService } from './check-doctor.service';

describe('CheckDoctorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckDoctorService]
    });
  });

  it('should be created', inject([CheckDoctorService], (service: CheckDoctorService) => {
    expect(service).toBeTruthy();
  }));
});

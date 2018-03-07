import { TestBed, inject } from '@angular/core/testing';

import { DoctorLoginService } from './doctor-login.service';

describe('DoctorLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorLoginService]
    });
  });

  it('should be created', inject([DoctorLoginService], (service: DoctorLoginService) => {
    expect(service).toBeTruthy();
  }));
});

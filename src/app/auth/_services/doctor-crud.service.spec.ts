import { TestBed, inject } from '@angular/core/testing';

import { DoctorCrudService } from './doctor-crud.service';

describe('DoctorCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorCrudService]
    });
  });

  it('should be created', inject([DoctorCrudService], (service: DoctorCrudService) => {
    expect(service).toBeTruthy();
  }));
});

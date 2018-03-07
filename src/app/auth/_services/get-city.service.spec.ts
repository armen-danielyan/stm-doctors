import { TestBed, inject } from '@angular/core/testing';

import { GetCityService } from './get-city.service';

describe('GetCityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCityService]
    });
  });

  it('should be created', inject([GetCityService], (service: GetCityService) => {
    expect(service).toBeTruthy();
  }));
});

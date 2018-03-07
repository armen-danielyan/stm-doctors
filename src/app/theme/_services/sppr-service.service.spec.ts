import { TestBed, inject } from '@angular/core/testing';

import { SpprServiceService } from './sppr-service.service';

describe('SpprServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpprServiceService]
    });
  });

  it('should be created', inject([SpprServiceService], (service: SpprServiceService) => {
    expect(service).toBeTruthy();
  }));
});

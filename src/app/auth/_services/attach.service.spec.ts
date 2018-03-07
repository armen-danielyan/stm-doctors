import { TestBed, inject } from '@angular/core/testing';

import { AttachService } from './attach.service';

describe('AttachService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachService]
    });
  });

  it('should be created', inject([AttachService], (service: AttachService) => {
    expect(service).toBeTruthy();
  }));
});

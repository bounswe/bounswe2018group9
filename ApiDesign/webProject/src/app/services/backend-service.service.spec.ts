import { TestBed, inject } from '@angular/core/testing';

import { BackendServiceService } from './backend-service.service';

describe('BackendServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendServiceService]
    });
  });

  it('should be created', inject([BackendServiceService], (service: BackendServiceService) => {
    expect(service).toBeTruthy();
  }));
});

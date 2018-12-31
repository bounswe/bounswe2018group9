import { TestBed, async, inject } from '@angular/core/testing';

import { CanEditGuard } from './can-edit.guard';

describe('CanEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanEditGuard]
    });
  });

  it('should ...', inject([CanEditGuard], (guard: CanEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { GaurdGuard } from './gaurd.guard';

describe('GaurdGuard', () => {
  let guard: GaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

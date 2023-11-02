import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { CanComponentDeactivate, deactivateGuard } from './deactivate.guard';

describe('deactivateGuard', () => {
  const executeGuard: CanDeactivateFn<CanComponentDeactivate> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

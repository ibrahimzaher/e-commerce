import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { orderdetailsGuard } from './orderdetails-guard';

describe('orderdetailsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderdetailsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

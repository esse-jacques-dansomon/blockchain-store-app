import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasShopGuard } from './has-shop.guard';

describe('hasShopGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasShopGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

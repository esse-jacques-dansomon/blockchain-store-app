import { TestBed } from '@angular/core/testing';

import { ShopContractService } from './shop-contract.service';

describe('GalleryService', () => {
  let service: ShopContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

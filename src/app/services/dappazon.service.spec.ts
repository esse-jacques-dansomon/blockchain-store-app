import { TestBed } from '@angular/core/testing';

import { DappazonService } from './dappazon.service';

describe('GalleryService', () => {
  let service: DappazonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DappazonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

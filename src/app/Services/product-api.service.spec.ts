import { TestBed } from '@angular/core/testing';

import { ProductAPIService } from './product-api.service';

describe('ProductAPIService', () => {
  let service: ProductAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ScheduledAdsService } from './scheduled-ads.service';

describe('ScheduledAdsService', () => {
  let service: ScheduledAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

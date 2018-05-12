import { TestBed, inject } from '@angular/core/testing';

import { CombineMetricsService } from './combine-metrics.service';

describe('CombineMetricsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CombineMetricsService]
    });
  });

  it('should be created', inject([CombineMetricsService], (service: CombineMetricsService) => {
    expect(service).toBeTruthy();
  }));
});

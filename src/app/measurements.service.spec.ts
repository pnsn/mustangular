import { TestBed, inject } from '@angular/core/testing';

import { MeasurementsService } from './measurements.service';

describe('MeasurementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementsService]
    });
  });

  it('should be created', inject([MeasurementsService], (service: MeasurementsService) => {
    expect(service).toBeTruthy();
  }));
});

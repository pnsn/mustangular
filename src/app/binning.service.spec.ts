import { TestBed, inject } from '@angular/core/testing';

import { BinningService } from './binning.service';

describe('BinningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BinningService]
    });
  });

  it('should be created', inject([BinningService], (service: BinningService) => {
    expect(service).toBeTruthy();
  }));
});

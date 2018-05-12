import { TestBed, inject } from '@angular/core/testing';

import { MakeMarkersService } from './make-markers.service';

describe('MakeMarkersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeMarkersService]
    });
  });

  it('should be created', inject([MakeMarkersService], (service: MakeMarkersService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ActiveService } from './active.service';

describe('ActiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveService]
    });
  });

  it('should be created', inject([ActiveService], (service: ActiveService) => {
    expect(service).toBeTruthy();
  }));
});

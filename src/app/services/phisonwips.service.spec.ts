import { TestBed, inject } from '@angular/core/testing';

import { PhisonwipsService } from './phisonwips.service';

describe('PhisonwipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhisonwipsService]
    });
  });

  it('should be created', inject([PhisonwipsService], (service: PhisonwipsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { GlucoseService } from './glucose.service';

describe('GlucoseService', () => {
  let service: GlucoseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlucoseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

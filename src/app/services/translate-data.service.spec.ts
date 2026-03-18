import { TestBed } from '@angular/core/testing';

import { TranslateDataService } from './translate-data.service';

describe('DataService', () => {
  let service: TranslateDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

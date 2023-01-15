import { TestBed } from '@angular/core/testing';

import { CampanyaDataService } from './campanya-data.service';

describe('CampanyaDataService', () => {
  let service: CampanyaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampanyaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

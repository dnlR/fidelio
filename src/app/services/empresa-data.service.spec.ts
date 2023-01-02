import { TestBed } from '@angular/core/testing';

import { EmpresaDataService } from './empresa-data.service';

describe('EmpresaDataService', () => {
  let service: EmpresaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

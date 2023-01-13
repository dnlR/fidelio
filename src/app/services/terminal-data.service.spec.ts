import { TestBed } from '@angular/core/testing';

import { TerminalDataService } from './terminal-data.service';

describe('TerminalDataService', () => {
  let service: TerminalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

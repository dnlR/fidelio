import { TestBed } from '@angular/core/testing';

import { StorageSupabaseService } from './storage-supabase.service';

describe('StorageSupabaseService', () => {
  let service: StorageSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

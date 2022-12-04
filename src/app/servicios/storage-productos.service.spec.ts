import { TestBed } from '@angular/core/testing';

import { StorageProductosService } from './storage-productos.service';

describe('StorageProductosService', () => {
  let service: StorageProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

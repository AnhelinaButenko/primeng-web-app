import { TestBed } from '@angular/core/testing';

import { ManufacturersListService } from './manufacturers-list.service';

describe('ManufacturersListService', () => {
  let service: ManufacturersListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManufacturersListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

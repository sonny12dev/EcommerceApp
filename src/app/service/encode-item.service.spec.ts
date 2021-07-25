import { TestBed } from '@angular/core/testing';

import { EncodeItemService } from './encode-item.service';

describe('EncodeItemService', () => {
  let service: EncodeItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncodeItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

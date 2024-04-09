import { TestBed } from '@angular/core/testing';

import { GetRequestQuoteService } from './get-request-quote-service.service';

describe('GetRequestQuoteService', () => {
  let service: GetRequestQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRequestQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

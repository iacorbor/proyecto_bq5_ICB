import { TestBed } from '@angular/core/testing';

import { Mortifago } from './mortifago';

describe('Mortifago', () => {
  let service: Mortifago;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mortifago);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MortifagoService } from './mortifago';

describe('Mortifago', () => {
  let service: MortifagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortifagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Peserta } from './peserta';

describe('Peserta', () => {
  let service: Peserta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Peserta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

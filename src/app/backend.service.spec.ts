import { TestBed } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { Firestore } from '@angular/fire/firestore';

describe('BackendService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Firestore, useValue: Firestore}
      ]
    });
    service = TestBed.inject(BackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

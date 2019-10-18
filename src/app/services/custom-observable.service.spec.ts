import { TestBed } from '@angular/core/testing';

import { CustomObservableService } from './custom-observable.service';

describe('CustomObservableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomObservableService = TestBed.get(CustomObservableService);
    expect(service).toBeTruthy();
  });
});

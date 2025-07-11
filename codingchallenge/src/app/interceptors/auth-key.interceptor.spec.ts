import { TestBed } from '@angular/core/testing';

import { AuthKeyInterceptor } from './auth-key.interceptor';

describe('AuthKeyInterceptor', () => {
  let service: AuthKeyInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthKeyInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

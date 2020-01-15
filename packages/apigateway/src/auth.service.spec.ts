import { TestBed } from '@microgamma/digator/lib/lib/testing/test-bed';
import { EndpointMock } from '@microgamma/apigator';
import { getSingleton } from '@microgamma/digator';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  let service: AuthService;

  beforeEach(() => {
    new TestBed({
      providers: [
        EndpointMock(AuthService)
      ]
    });

    service = getSingleton(AuthService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();

  });
});
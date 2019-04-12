// tslint:disable:no-expression-statement no-object-mutation
import { UserService } from './user.service';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:user.service.spec');

describe('user.service', () => {
  it('should be true', () => {
    expect(true).toBeTruthy();
  });
});
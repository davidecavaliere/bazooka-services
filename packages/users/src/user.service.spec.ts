// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { UserService } from './user.service';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:user.service.spec');

let instance: UserService;

test.beforeEach(() => {
  // instance = new UserService();
});


// test.only('can be instantiated', t => {
//   d('instance', instance);
//   t.is(instance instanceof UserService, true);
// });





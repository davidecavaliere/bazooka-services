// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { GroupService } from './group.service';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:group.service.spec');

let instance: GroupService;

test.beforeEach(() => {
  instance = new GroupService();
});

test.only('can be instantiated', t => {
  d('instance', instance);
  t.is(instance instanceof GroupService, true);
});





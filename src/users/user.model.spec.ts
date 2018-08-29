// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { User } from './user.model';
import { getColumnMetadata } from '../lib/model/column.decorator';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:user.model.spec');

let instance: User;

test.beforeEach(() => {
  instance = new User();
});

test('user model', t => {
  // console.log('instance', instance);
  t.is(instance instanceof User, true);
});

test('should have a schema definition', t => {
  t.deepEqual(getColumnMetadata(instance), {});
});

test('should have collection metadata', t => {
  t.deepEqual(instance['collection'], {});
});


test.only('should connect to db when trying to getModel()', t => {
  t.plan(1);
  return instance.findAll().then((docs) => {
    d('found docs', docs);
    t.is(true, true);
  });

});

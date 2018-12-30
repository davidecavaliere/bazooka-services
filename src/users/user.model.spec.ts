// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { User } from './user.model';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:user.model.spec');

let instance: User;

const user = {
  password: 'my-password',
  company: 'my-realms',
  email: 'email',
  name: 'my-name',
  role: 'pawn'
};



test.beforeEach(() => {
  d('running user modelFactory tests');
});

test('user modelFactory', t => {
  instance = new User(user);
  d('instance', instance);
  t.is(instance instanceof User, true);
  t.is(instance.name, user.name);
  t.is(instance.email, user.email);

  // TODO add the following checks
  // t.is(instance.hashedPassword, );
  // t.is(instance.salt, 'abc');
  // t.is(instance.realms, 'testcompany');

  t.deepEqual(instance.settings, undefined);

});

// test('should have a schema definition', t => {
//   t.deepEqual(getColumnMetadata(instance), {});
// });
//
// test('should have collection metadata', t => {
//   // t.deepEqual(instance['collection'], {});
// });


// test('should connect to db when trying to getModel()', t => {
//   t.plan(1);
//   return instance.findAll().then((docs) => {
//     d('found docs', docs);
//     t.is(true, true);
//   });
//
// });

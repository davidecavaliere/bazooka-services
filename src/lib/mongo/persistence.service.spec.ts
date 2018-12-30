// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getDebugger } from '@microgamma/ts-debug';
import { PersistenceService } from './persistence.service';
import { Persistence } from '../di/persistence.decorator';
import { User } from '../../users/user.model';

const d = getDebugger('microgamma:persistence.service.spec');


@Persistence({
  uri: 'mongodb://192.168.254.3:27017',
  dbName: 'test',
  collection: 'users',
  model: User
})
class UserPersistenceService extends PersistenceService<User> {

}

let instance: UserPersistenceService;

test.beforeEach(() => {
  instance = new UserPersistenceService();

});

test('can be instantiated', t => {
  t.plan(2);
  d('instance', instance);
  t.is(instance instanceof UserPersistenceService, true);
  return instance.getClient().then((client) => {
    // client.db()
    t.is(client.isConnected(), true);
    instance.findAll().then((docs) => {
      d('docs found', docs);
    });
  }).catch((err) => {
    t.is(err, false)
  });

});

test('should create a user', (t) => {
  t.plan(1);

  const u = new User({
    password: 'my-password',
    email: 'email',
    name: 'my-name',
    role: 'pawn'
  });

  return instance.create(u).then((res) => {
    t.is(res, {});

  })

});






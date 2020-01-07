// tslint:disable:no-expression-statement no-object-mutation
import { User } from './user.model';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:user.model.spec');

describe('user.model', () => {

  let instance: User;

  const user = {
    password: 'my-password',
    company: 'my-realms',
    email: 'email',
    name: 'my-name',
    role: 'pawn'
  };

  beforeEach(() => {
    instance = new User(user);
    d('instance', instance);

  });


  it('should set given fields', () => {
    expect(instance instanceof User).toBeTruthy();
    expect(instance.name).toEqual(user.name);
    expect(instance.email).toEqual(user.email);
  
    // TODO add the following checks
    // expect.is(instance.hashedPassword, );
    // expect.is(instance.salt, 'abc');
    // expect.is(instance.realms, 'testcompany');
  
    expect(instance.settings).toBeFalsy();
  
  });
  
});


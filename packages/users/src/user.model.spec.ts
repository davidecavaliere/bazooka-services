// tslint:disable:no-expression-statement no-object-mutation
import { User } from './user.model';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('bazooka:user.model.spec');

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
  
    expect(instance.settings).toBeFalsy();
  
  });

  describe('#authenticate', () => {
    it('should not authenticate an invalid password', () => {
      expect(instance.authenticate('abc')).toBeFalsy();
    });

    it('should authenticate a valid password', () => {
      d('password', instance.hashedPassword);
      expect(instance.authenticate('my-password')).toBeTruthy();
    });

  });
  
});


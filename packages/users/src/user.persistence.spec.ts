import { TestBed } from '@microgamma/digator/lib/lib/testing/test-bed';
import { UserPersistenceService } from './user.persistence';
import { getSingleton } from '@microgamma/digator';
import { getDebugger } from '@microgamma/loggator';
import Mock = jest.Mock;
import { User } from './user.model';

jest.mock('jsonwebtoken', () => {
  return {sign: jest.fn().mockReturnValue('a-token')};
});

describe('user.persistence', () => {
  const d = getDebugger('microgamma:user.persistence.spec');

  let persistence: UserPersistenceService & {
    promiseMock: Mock
  };

  beforeEach(() => {


    const testBed = new TestBed({
      providers: [
        {
          provide: UserPersistenceService,
          // TODO: use a function to auto mock this class
          useClass: class _ extends UserPersistenceService {

            public promiseMock = jest.fn();


            constructor() {
              super();
              this.tableName = 'test_table_name';

              this.ddb.query = jest.fn((...args) => {
                return {
                  promise: this.promiseMock
                }

              });

            }

          }
        }
      ]
    });

    persistence = getSingleton(UserPersistenceService);

  });

  it('should instantiate', () => {
    expect(persistence).toBeTruthy();
  });

  describe('#authenticate', () => {

    it('should throw [404] when a user cannot be found', async () => {

      persistence.promiseMock.mockResolvedValueOnce({Items: [], Count: 0});

      try {

        await persistence.authenticate({
          email: 'email@email.it',
          password: 'a-password'
        });

        // to make sure the we don't get through here
        expect(true).toBeFalsy();

      } catch (e) {
        expect(e).toEqual(Error('[404] User not found with email: email@email.it'));
      }

    });

    it('should throw [403] when user is not authenticated', async () => {
      persistence.promiseMock.mockResolvedValueOnce({
        Count: 1,
        Items: [{
          salt: 'oHdnC5YPqOcdllJ5nmN5zQ==',
          hashedPassword: '2bc935a4749753819abd2d097015d697721483006549ddd55c5e3e148f89e34e',
          company: 'my-realms',
          email: 'email',
          name: 'my-name',
          role: 'pawn',
          realms: []
        }]
      });


      try {
        await persistence.authenticate({email: 'email', password: 'a-password'});
        // to make sure the we don't get through here
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e).toEqual(Error('[403] Unable to authenticate user: email'));
      }
    });

  });

  it('should authenticate a valid password', async () => {
    process.env['SECRET'] = 'MY-SECRET';

    persistence.promiseMock.mockResolvedValueOnce({
      Count: 1,
      Items: [{
        id: 'abc',
        salt: 'oHdnC5YPqOcdllJ5nmN5zQ==',
        hashedPassword: '2bc935a4749753819abd2d097015d697721483006549ddd55c5e3e148f89e34e',
        email: 'email',
        name: 'my-name',
        role: 'pawn',
        realms: []
      }]
    });

    const resp = await persistence.authenticate({email: 'email', password: 'my-password'});
    d(resp);
    expect(resp).toEqual(new User({
      id: 'abc',
      salt: 'oHdnC5YPqOcdllJ5nmN5zQ==',
      hashedPassword: '2bc935a4749753819abd2d097015d697721483006549ddd55c5e3e148f89e34e',
      email: 'email',
      name: 'my-name',
      role: 'pawn',
      realms: [],
      token: 'a-token',
    }));

    // tslint:disable: no-delete
    delete process.env['SECRET'];
  });
});
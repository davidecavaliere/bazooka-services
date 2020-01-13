// tslint:disable:no-expression-statement no-object-mutation max-classes-per-file no-console member-access no-unused-expression
import { UserService } from './user.service';
import { TestBed } from '@microgamma/digator/lib/lib/testing/test-bed';
import { getDebugger } from '@microgamma/loggator';
import { UserPersistenceService } from './user.persistence';
import { getSingleton } from '@microgamma/digator';
import { EndpointMock } from '@microgamma/apigator';
import { sign } from 'jsonwebtoken';
import createSpy = jasmine.createSpy;

const d = getDebugger('microgamma:user.service.spec');

describe('user.service', () => {

  let service: UserService;
  let persistence: UserPersistenceService;

  beforeEach(() => {
    process.env['SECRET'] = 'MY-SECRET';
  });

  afterEach(() => {
    // tslint:disable: no-delete
    delete process.env['SECRET'];

  });

  beforeEach(() => {
    new TestBed({
      providers: [
        EndpointMock(UserService),
        {
          provide: UserPersistenceService,
          // TODO: use a function to auto mock this class
          useClass: class {
            findAll = createSpy('findAll').and.returnValue(Promise.resolve([]));
            findOne = createSpy('findOne').and.returnValue(Promise.resolve({id: 'my-id'}));
            create = createSpy('create');
            update = createSpy('update');
            delete = createSpy('delete');
            authenticate = createSpy('authenticate');
          }
        }
      ]
    });

    service = getSingleton(UserService);



    persistence = getSingleton(UserPersistenceService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should #findAll', async () => {
    const resp = await service.findAll();
    expect(persistence.findAll).toHaveBeenCalled();
    expect(resp).toBeTruthy();

  });

  it('should #findById', async () => {
    const resp = await service.findById('my-id');
    expect(persistence.findOne).toHaveBeenCalledWith('my-id');
    expect(resp).toBeTruthy();

  });

  it('should verify the auth token', async () => {
    const token = sign({}, process.env['SECRET']);
    d({token});
    const resp = await service.me(token);
    // expect(persistence.authenticate).toHaveBeenCalled();
    expect(resp).toBeTruthy();
  })
});
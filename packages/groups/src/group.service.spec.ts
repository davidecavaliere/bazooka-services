// tslint:disable:no-expression-statement no-object-mutation  no-unused-expression member-access
import { GroupService } from './group.service';
import { getDebugger } from '@microgamma/loggator';
import { TestBed } from '@microgamma/digator/lib/lib/testing/test-bed';
import { getSingleton } from '@microgamma/digator';
import { GroupPersistence } from './group.persistence';
import createSpy = jasmine.createSpy;
import { EndpointMock } from '@microgamma/apigator';

const d = getDebugger('microgamma:group.service.spec');

describe('group.service', () => {
  let service: GroupService;
  let persistence: GroupPersistence;

  beforeEach(() => {
    new TestBed({
      providers: [
        EndpointMock(GroupService),
        {
          provide: GroupPersistence,
          // TODO: use a function to auto mock this class
          useClass: class {
            findAll = createSpy('findAll').and.returnValue(Promise.resolve([]));
            findOne = createSpy('findOne').and.returnValue(Promise.resolve({id: 'my-id'}));
            findByOwner = createSpy('findByOwner').and.returnValue(Promise.resolve({id: 'owner-id'}));
            findByMember = createSpy('findByMember').and.returnValue(Promise.resolve({id: 'member-id'}));
            create = createSpy('create');
            update = createSpy('update');
            remove = createSpy('remove');
          }
        }
      ]
    });

    service = getSingleton(GroupService);
    persistence = getSingleton(GroupPersistence);
  });

  it('can be instantiated', () => {

    expect(service instanceof GroupService).toBeTruthy();
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

  it('should #findByOwner', async () => {
    const resp = await service.findByOwner('owner-id');
    expect(persistence.findByOwner).toHaveBeenCalledWith('owner-id');
    expect(resp).toBeTruthy();

  });

  it('should #findByMember', async () => {
    const resp = await service.findByMember('member-id');
    expect(persistence.findByMember).toHaveBeenCalledWith('member-id');
    expect(resp).toBeTruthy();

  });

  fit('should #create', async () => {
    const resp = await service.create({
      name: 'group-name',
      users: []
    }, 'owner-id');
    expect(persistence.create).toHaveBeenCalledWith({
      name: 'group-name',
      users: [],
      owner: 'owner-id'
    });
    expect(resp).toBeTruthy();

  });

});









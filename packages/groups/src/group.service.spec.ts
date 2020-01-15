// tslint:disable:no-expression-statement no-object-mutation  no-unused-expression member-access no-mixed-interface max-classes-per-file
import { GroupService } from './group.service';
import { getDebugger } from '@microgamma/loggator';
import { GroupPersistence } from './group.persistence';
import { EndpointMock } from '@microgamma/apigator';
import { TestBed } from '@microgamma/digator/lib/lib/testing/test-bed';
import { getSingleton } from '@microgamma/digator';
import { Mocked, WithMock } from '@microgamma/digator/lib/lib/testing/mocked';

const d = getDebugger('bazooka:group.service.spec');


describe('group.service', () => {
  let service: GroupService;
  let persistence: WithMock<GroupPersistence>;

  beforeEach(() => {
    const testBed = new TestBed({
      providers: [
        EndpointMock(GroupService),
        {
          provide: GroupPersistence,
          useClass: Mocked(GroupPersistence, {
            mockOwnMethods: true,
            mockParentMethods: true
          })
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
    persistence.flush([]);
    const resp = await service.findAll();
    expect(persistence.findAll).toHaveBeenCalled();
    expect(resp).toBeTruthy();

  });

  it('should #findById', async () => {
    persistence.flush({});
    const resp = await service.findById('my-id');
    expect(persistence.findOne).toHaveBeenCalledWith('my-id');
    expect(resp).toBeTruthy();

  });

  it('should #findByOwner', async () => {

    persistence.flush([]);
    const resp = await service.findByOwner('owner-id');
    expect(persistence.findByOwner).toHaveBeenCalledWith('owner-id');
    expect(resp).toBeTruthy();

  });

  it('should #findByMember', async () => {
    persistence.flush([]);
    const resp = await service.findByMember('member-id');
    expect(persistence.findByMember).toHaveBeenCalledWith('member-id');
    expect(resp).toBeTruthy();

  });

  it('should #create', async () => {
    persistence.flush({});

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

  it('should #update', async () => {
    persistence.flush({});

    const resp = await service.update({
      _id: 'abc',
      name: 'group-name',
      users: [],
      owner: 'owner-id'
    });

    expect(persistence.create).toHaveBeenCalledWith({
      _id: 'abc',
      name: 'group-name',
      users: [],
      owner: 'owner-id'
    });
    expect(resp).toBeTruthy();

  });

});









//  tslint:disable:no-mixed-interface member-access
import { GroupPersistence } from './group.persistence';
import { getDebugger } from '@microgamma/loggator';
import { TestBed } from '@microgamma/digator/lib/lib/testing/test-bed';
import { getSingleton } from '@microgamma/digator';
import { Mocked, WithMock } from '@microgamma/digator/lib/lib/testing/mocked';

const d = getDebugger('bazooka:group.persistence.spec');

describe('group.persistence', () => {
  let persistence: WithMock<GroupPersistence>;

  beforeEach(() => {
    // tslint:disable-next-line:no-unused-expression
    const testBed = new TestBed({
      providers: [
        {
          provide: GroupPersistence,
          useClass: Mocked(GroupPersistence, {
            mockOwnMethods: true,
            mockParentMethods: true
          })
        }
      ]
    });

    persistence = getSingleton(GroupPersistence);

  });

  it('should create', async () => {
    expect(persistence).toBeTruthy();

  });

  it('should find by owner', async () => {
    persistence.mock.mockResolvedValueOnce([]);

    const resp = await persistence.findByOwner('owner-id');
    expect(resp).toEqual([]);
    expect(persistence.findAll).toHaveBeenCalledWith('owner-id');

  });

  it('should find by member', async () => {
    persistence.flush([]);

    const resp = await persistence.findByMember('user-id');
    expect(resp).toEqual([]);
    expect(persistence.findAll).toHaveBeenCalledWith( 'user-id');

  });
});
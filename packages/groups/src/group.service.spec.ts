// tslint:disable:no-expression-statement no-object-mutation
import { GroupService } from './group.service';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:group.service.spec');

describe('group.service', () => {
  let instance: GroupService;

  beforeEach(() => {
    instance = new GroupService();
  });

  it('can be instantiated', () => {
    d('instance', instance);
    expect(instance instanceof GroupService).toBeTruthy();
  });
});









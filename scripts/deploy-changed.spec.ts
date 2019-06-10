import { DeployChanged } from './deploy-changed';


describe('deploy-changed', () => {

  let instance;

  beforeEach(() => {
    instance = new DeployChanged();
  });

  it('should run "lerna list -a --json"', async () => {

    const [resp, err] = await instance.listPackages();

    expect(resp).toEqual([
      {
        location: '/home/developer/src/services/packages/apigateway',
        name: '@bazooka/apigateway',
        private: true,
        version: '1.10.6'
      },
      {
        location: '/home/developer/src/services/packages/files',
        name: '@bazooka/files',
        private: true,
        version: '1.10.6'
      },
      {
        location: '/home/developer/src/services/packages/groups',
        name: '@bazooka/groups',
        private: true,
        version: '1.10.6'
      },
      {
        location: '/home/developer/src/services/packages/users',
        name: '@bazooka/users',
        private: true,
        version: '1.10.6'
      }
    ]);
    expect(err).toEqual({});

  });

  it('should run "lerna changed -a json"', async () => {
    const [resp, err] = await instance.getChanged();

    expect(resp).toEqual({});
    expect(err).toEqual({});
  });
});
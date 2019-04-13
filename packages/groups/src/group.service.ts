import { Endpoint, Lambda } from '@microgamma/apigator';
import { GroupPersistence } from './group.persistence';
import { GroupModel } from './group.model';
import { Log } from '@microgamma/loggator';
import { Inject, Injectable } from '@microgamma/digator';

const authenticator = {
  type: 'CUSTOM',
  authorizerId:  {
    'Fn::ImportValue': 'apigateway-ApiGatewayAuthorizerId'
  }
};

@Endpoint({
  name: 'GroupEndpoint',
  basePath: '/groups',
  cors: true
})
@Injectable()
export class GroupService {

  @Log('microgamma:service:groups')
  private d;

  @Inject(GroupPersistence)
  private persistence: GroupPersistence;

  @Lambda({
    name: 'findAll',
    path: '/',
    method: 'GET',
    authorizer: authenticator
  })
  public async findAll() {
    return this.persistence.findAll();
  }

  @Lambda({
    name: 'findById',
    path: '/{id}',
    method: 'GET',
    authorizer: authenticator
  })
  public async findById(id) {
    return this.persistence.findOne(id);
  }

  @Lambda({
    path: '/owner/{ownerId}',
    method: 'GET',
    authorizer: authenticator
  })
  public async findByOwner(ownerId) {
    return this.persistence.findByOwner(ownerId);
  }

  @Lambda({
    path: '/user/{userId}',
    method: 'GET',
    authorizer: authenticator
  })
  public async findByMember(userId) {
    return this.persistence.findByMember(userId);
  }

  @Lambda({
    name: 'create',
    path: '/',
    method: 'POST',
    authorizer: authenticator
  })
  public async create(body: GroupModel, principalId: string) {
    this.d('saving Group', body);

    body.owner = principalId;

    return this.persistence.create(body);
  }

  @Lambda({
    name: 'update',
    path: '/',
    method: 'PUT',
    authorizer: authenticator
  })
  public async update(body) {
    return this.persistence.update(body);
  }

  @Lambda({
    name: 'remove',
    path: '/{id}',
    method: 'DELETE',
    authorizer: authenticator
  })
  public async remove(id) {
    return this.persistence.delete(id);
  }

}

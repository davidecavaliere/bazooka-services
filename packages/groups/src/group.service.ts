import { Body, Endpoint, Header, Lambda, Path } from '@microgamma/apigator';
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

  @Log('bazooka:service:groups')
  private $log;

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
  public async findById(@Path('id') id) {
    return this.persistence.findOne(id);
  }

  @Lambda({
    path: '/owner/{ownerId}',
    method: 'GET',
    authorizer: authenticator
  })
  public async findByOwner(@Path('ownerId') ownerId) {
    return this.persistence.findByOwner(ownerId);
  }

  @Lambda({
    path: '/user/{userId}',
    method: 'GET',
    authorizer: authenticator
  })
  public async findByMember(@Path('userId') userId) {
    return this.persistence.findByMember(userId);
  }

  @Lambda({
    name: 'create',
    path: '/',
    method: 'POST',
    authorizer: authenticator
  })
  public async create(@Body() body, @Header('principalId') owner) {

    // TODO: casting can be removed once changes to mongodbgator are published
    // tslint:disable: no-object-literal-type-assertion
    return this.persistence.create({
      ...body,
      owner
    } as GroupModel);
  }

  @Lambda({
    name: 'update',
    path: '/',
    method: 'PUT',
    authorizer: authenticator
  })
  public async update(@Body() body) {
    return this.persistence.update(body);
  }

  @Lambda({
    name: 'remove',
    path: '/{id}',
    method: 'DELETE',
    authorizer: authenticator
  })
  public async remove(@Path('id') id) {
    return this.persistence.delete(id);
  }

}

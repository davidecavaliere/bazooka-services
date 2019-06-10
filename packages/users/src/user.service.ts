import { Endpoint, Lambda } from '@microgamma/apigator';
import { UserPersistenceService } from './user.persistence';
import { getDebugger } from '@microgamma/loggator';
import { Inject, Injectable } from '@microgamma/digator';
import { User } from './user.model';

const d = getDebugger('microgamma:user.service');

const authenticator = {
  type: 'CUSTOM',
  authorizerId:  {
    'Fn::ImportValue': 'apigateway-ApiGatewayAuthorizerId'
  }
};

@Injectable()
@Endpoint({
  name: 'UserEndpoint',
  cors: true,
  basePath: '/users'
})
export class UserService {

  @Inject(UserPersistenceService)
  private readonly persistence: UserPersistenceService;

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
    name: 'create',
    path: '/',
    method: 'POST',
    authorizer: authenticator
  })
  public async create(body) {
    d('saving user', body);
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

  @Lambda({
    name: 'authenticate',
    path: '/auth',
    method: 'POST'
  })
  public async authenticate(body): Promise<User> {
    d('authenticating user with', body);
    return this.persistence.authenticate({email: body.email, password: body.password});
  }

  @Lambda({
    path: '/me',
    method: 'GET',
    authorizer: authenticator
  })
  public async me(principalId): Promise<{ _id: string }> {
    return this.persistence.findOne(principalId);
  }

}

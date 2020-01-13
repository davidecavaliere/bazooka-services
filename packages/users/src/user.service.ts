import { Body, Endpoint, Header, Lambda, Path } from '@microgamma/apigator';
import { UserPersistenceService } from './user.persistence';
import { getDebugger } from '@microgamma/loggator';
import { Inject, Injectable } from '@microgamma/digator';
import { User } from './user.model';
import { verify } from 'jsonwebtoken';
// tslint:disable: no-implicit-dependencies

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


  // TODO: enable authentication
  @Lambda({
    path: '/',
    method: 'GET',
    authorizer: authenticator
  })
  public async findAll() {
    return this.persistence.findAll();
  }

  @Lambda({
    path: '/{id}',
    method: 'GET',
    authorizer: authenticator
  })
  public async findById(@Path('id') id) {
    return this.persistence.findOne(id);
  }

  @Lambda({
    name: 'create',
    path: '/',
    method: 'POST',
    authorizer: authenticator
  })
  public async create(@Body() body) {
    return this.persistence.create(body);
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

  @Lambda({
    name: 'authenticate',
    path: '/auth',
    method: 'POST'
  })
  public async authenticate(@Body() body): Promise<User> {
    d('authenticating user with', body);
    return this.persistence.authenticate({email: body.email, password: body.password});
  }

  @Lambda({
    path: '/me',
    method: 'GET',
    authorizer: authenticator
  })
  public async me(@Header('Authorization') auth: string): Promise<{}> {
    d({auth});

    const decoded = verify(auth, process.env['SECRET']) as {};
    return {
      ...decoded,
      token: auth
    };
  }

}

import { Endpoint, Lambda, Authorizer, Injectable, Inject } from '@microgamma/apigator';
import { UserPersistenceService } from './user.persistence';
import { verify } from 'jsonwebtoken';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:user.service');


@Endpoint({
  name: 'UserEndpoint',
  private: true,
  cors: true,
  basePath: '/users'
})
@Injectable()
export class UserService {

  @Inject(UserPersistenceService)
  persistence: UserPersistenceService;

  @Lambda({
    name: 'findAll',
    path: '/',
    method: 'GET',
    authorizer: 'authorize'
  })
  public async findAll() {
    return this.persistence.findAll();
  }

  @Lambda({
    name: 'findById',
    path: '/{id}',
    method: 'GET',
    authorizer: 'authorize'
  })
  public async findById(id) {
    return this.persistence.findOne(id);
  }

  @Lambda({
    name: 'create',
    path: '/',
    method: 'POST',
    authorizer: 'authorize'
  })
  public async create(body) {
    d('saving user', body);
    return this.persistence.create(body);
  }

  @Lambda({
    name: 'update',
    path: '/',
    method: 'PUT',
    authorizer: 'authorize'
  })
  public async update(body) {
    return this.persistence.update(body);
  }

  @Lambda({
    name: 'remove',
    path: '/{id}',
    method: 'DELETE',
    authorizer: 'authorize'
  })
  public async remove(id) {
    return this.persistence.delete(id);
  }

  @Lambda({
    name: 'authenticate',
    path: '/auth',
    method: 'POST'
  })
  public async authenticate(body) {
    d('authenticating user with', body);
    return this.persistence.authenticate({email: body.email, password: body.password});
  }

  @Authorizer()
  public async authorize(token, resource) {
    d('got token', token);
    d('got resource', resource);
    const decoded = verify(token, process.env['SECRET']);
    d('decoded token', decoded);

    return decoded['_id'];
  }

}
import { Authorizer, Endpoint, Inject, Injectable, Lambda } from '@microgamma/apigator';
import { verify } from 'jsonwebtoken';
import { GroupPersistence } from './group.persistence';
import { GroupModel } from './group.model';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:service:groups');

@Endpoint({
  name: 'GroupEndpoint',
  basePath: 'groups',
  cors: true
})
@Injectable()
export class GroupService {

  @Inject(GroupPersistence)
  private persistence: GroupPersistence;

  @Lambda({
    name: 'findAll',
    path: '/',
    method: 'GET',
    authorizer: 'groupAuthorizer'
  })
  public async findAll() {
    return this.persistence.findAll();
  }

  @Lambda({
    name: 'findById',
    path: '/{id}',
    method: 'GET',
    authorizer: 'groupAuthorizer'
  })
  public async findById(id) {
    return this.persistence.findOne(id);
  }

  @Lambda({
    path: '/owner/{ownerId}',
    method: 'GET',
    authorizer: 'groupAuthorizer'
  })
  public async findByOwner(ownerId) {
    return this.persistence.findByOwner(ownerId);
  }

  @Lambda({
    path: '/user/{userId}',
    method: 'GET',
    authorizer: 'groupAuthorizer'
  })
  public async findByMember(userId) {
    return this.persistence.findByMember(userId);
  }

  @Lambda({
    name: 'create',
    path: '/',
    method: 'POST',
    authorizer: 'groupAuthorizer'
  })
  public async create(body: GroupModel, principalId: string) {
    d('saving Group', body);

    body.owner = principalId;

    return this.persistence.create(body);
  }

  @Lambda({
    name: 'update',
    path: '/',
    method: 'PUT',
    authorizer: 'groupAuthorizer'
  })
  public async update(body) {
    return this.persistence.update(body);
  }

  @Lambda({
    name: 'remove',
    path: '/{id}',
    method: 'DELETE',
    authorizer: 'groupAuthorizer'
  })
  public async remove(id) {
    return this.persistence.delete(id);
  }

  @Authorizer({
    name: 'groupAuthorizer'
  })
  public async groupAuthorizer(token, resource) {
    d('got token', token);
    d('got resource', resource);
    const decoded = verify(token, process.env['SECRET']);
    console.log('decoded token', decoded);
    return decoded['_id'];
  }

}

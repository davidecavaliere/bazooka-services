import { Authorizer, Endpoint, Inject, Injectable, Lambda } from '@microgamma/apigator';
import { getDebugger } from '@microgamma/ts-debug';
import { verify } from 'jsonwebtoken';
import { GroupPersistence } from './group.persistence';
import { GroupModel } from './group.model';

const d = getDebugger('microgamma:service:groups');

@Endpoint({
  name: 'GroupEndpoint',
  private: true,
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
  public async create(body: GroupModel, principalId) {
    d('saving Group', body);

    body.owner = principalId;

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

  @Authorizer({
    name: 'authorize'
  })
  public async authorize(token, resource) {
    d('got token', token);
    d('got resource', resource);
    const decoded = verify(token, process.env['SECRET']);
    console.log('decoded token', decoded);
    return decoded['_id'];
  }

}
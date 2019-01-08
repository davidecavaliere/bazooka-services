import { Endpoint, Lambda, Authorizer, Injectable, Inject } from '@microgamma/apigator';
import { getDebugger } from '@microgamma/ts-debug';
import { verify } from 'jsonwebtoken';
import { GroupPersistence } from './group.persistence';

const d = getDebugger('microgamma:service:groups');

@Endpoint({
  name: 'GroupEndpoint',
  private: true,
  cors: true
})
@Injectable()
export class GroupService {

  // static instances = 0;
  //
  // private user;
  //
  //
  // constructor() {
  //   GroupService.instances += 1;
  //   console.log('=====================================');
  //   console.log(`++++ ${GroupService.instances}    ++++`);
  //   console.log('=====================================');
  // }

  //
  // @Lambda({
  //   name: 'findAll',
  //   path: '/',
  //   method: 'GET',
  //   authorizer: 'authorize'
  // })
  // public async findAll(context, event, principalId, requestContext) {
  //   console.log('logged in user is', principalId);
  //   // return this.persistence.findAll();
  //
  //   console.log('event is', event);
  //   console.log('context', context);
  //   console.log('requestContext', requestContext);
  //   return [{hello: principalId}]
  //
  // }
  //
  // @Authorizer()
  // public async authorize(token, resource) {
  //   this.user = 'bobby';
  //   d('got token', token);
  //   d('got resource', resource);
  //   const decoded = verify(token, process.env['SECRET']);
  //   console.log('decoded token', decoded);
  //   // this.user = decoded;
  //   return decoded['email'];
  // }



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
  public async create(body, event) {
    d('saving Group', body);
    d('event is', event);
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
    return true;
  }

}
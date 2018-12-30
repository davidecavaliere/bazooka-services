// import { Endpoint, Lambda, Authorizer, Injectable, Inject } from '@microgamma/apigator';
// import { getDebugger } from '@microgamma/ts-debug';
// import { verify } from 'jsonwebtoken';
//
// const d = getDebugger('microgamma:service:groups');
//
// @Endpoint({
//   name: 'GroupEndpoint',
//   private: true,
//   cors: true
// })
// @Injectable()
// export class GroupService {
//
//   @Inject(GroupPersistenceService)
//   private persistence: GroupPersistenceService;
//
//   @Lambda({
//     name: 'findAll',
//     path: '/',
//     method: 'GET',
//     authorizer: 'authorize'
//   })
//   public async findAll() {
//     return this.persistence.findAll();
//   }
//
//   @Lambda({
//     name: 'findById',
//     path: '/{id}',
//     method: 'GET',
//     authorizer: 'authorize'
//   })
//   public async findById(id) {
//     return this.persistence.findOne(id);
//   }
//
//   @Lambda({
//     name: 'create',
//     path: '/',
//     method: 'POST',
//     authorizer: 'authorize'
//   })
//   public async create(body) {
//     d('saving Group', body);
//     return this.persistence.create(body);
//   }
//
//   @Lambda({
//     name: 'update',
//     path: '/',
//     method: 'PUT',
//     authorizer: 'authorize'
//   })
//   public async update(body) {
//     return this.persistence.update(body);
//   }
//
//   @Lambda({
//     name: 'remove',
//     path: '/{id}',
//     method: 'DELETE',
//     authorizer: 'authorize'
//   })
//   public async remove(id) {
//     return this.persistence.delete(id);
//   }
//
//   @Lambda({
//     name: 'authenticate',
//     path: '/auth',
//     method: 'POST'
//   })
//   public async authenticate(body) {
//     d('authenticating Group with', body);
//     return this.persistence.authenticate({email: body.email, password: body.password});
//   }
//
//   @Authorizer()
//   public async authorize(token, resource) {
//     d('got token', token);
//     d('got resource', resource);
//     const decoded = verify(token, process.env['SECRET']);
//     d('decoded token', decoded);
//
//     return true;
//   }
//
// }
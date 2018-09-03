import { MongoCollection } from '../mongo/collection';
import { getDebugger } from '@microgamma/ts-debug';
import { getPersistenceMetadata } from '../di/persistence.decorator';
import { Lambda } from '@microgamma/apigator';

const d = getDebugger('microgamma:rest-api.service');

export abstract class RestApiService {
  protected persistenceService: MongoCollection;

  constructor() {
    const persistenceClass = getPersistenceMetadata(this);
    d('got persistence class', persistenceClass);

    d('instantiating persistence layer');
    this.persistenceService = new persistenceClass();
  }

  //
  //
  // @Lambda({
  //   name: 'findAll',
  //   path: '/',
  //   method: 'GET'
  // })
  // public async findAll() {
  //   return this.persistenceService.findAll();
  // }
  //
  // @Lambda({
  //   name: 'findById',
  //   path: '/{id}',
  //   method: 'GET'
  // })
  // public async findById(id) {
  //   return this.persistenceService.findOne(id);
  // }
  //
  // @Lambda({
  //   name: 'create',
  //   path: '/',
  //   method: 'POST'
  // })
  // public async create(email, password) {
  //   console.log('email, password', email, password);
  //   return this.persistenceService.create({
  //     email, password
  //   });
  // }
  //
  // @Lambda({
  //   name: 'update',
  //   path: '/',
  //   method: 'PUT'
  // })
  // public async update (body) {
  //   return this.persistenceService.update(body);
  // }
  //
  // @Lambda({
  //   name: 'remove',
  //   path: '/{id}',
  //   method: 'DELETE'
  // })
  // public async remove(id) {
  //   return this.persistenceService.delete(id);
  // }


}
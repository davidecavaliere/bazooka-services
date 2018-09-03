import { MongoCollection } from '../mongo/collection';
import { getDebugger } from '@microgamma/ts-debug';
import { getPersistenceMetadata } from '../di/persistence.decorator';

const d = getDebugger('microgamma:rest-api.service');

export abstract class RestApiService {
  protected persistenceService: MongoCollection;

  protected constructor() {
    const persistenceClass = getPersistenceMetadata(this);
    d('got persistence class', persistenceClass);

    d('instantiating persistence layer');
    this.persistenceService = new persistenceClass();
  }

}
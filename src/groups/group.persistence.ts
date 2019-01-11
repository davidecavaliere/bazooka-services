import { Persistence } from '../lib/di/persistence.decorator';
import { PersistenceService } from '../lib/mongo/persistence.service';
import { getDebugger } from '@microgamma/ts-debug';
import { Injectable } from '@microgamma/apigator';
import { GroupModel } from './group.model';

const d = getDebugger('microgamma:group.persistence.service');

@Persistence({
  uri: process.env['MONGODB_ATLAS_CLUSTER_URI'] || 'mongodb://192.168.254.2:27017/test',
  dbName: 'test',
  collection: 'groups',
  model: GroupModel
})
@Injectable()
export class GroupPersistence extends PersistenceService<GroupModel> {

  public async createGrooup(doc, owner) {
    // check is owner is valid

    (await this.getCollection())
  }
}
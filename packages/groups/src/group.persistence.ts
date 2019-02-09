import { GroupModel } from './group.model';
import { Persistence, PersistenceService } from '@microgamma/datagator';
import { Injectable } from '@microgamma/digator';


@Persistence({
  uri: process.env['MONGODB_ATLAS_CLUSTER_URI'] || 'mongodb://192.168.254.2:27017/test',
  dbName: 'test',
  collection: 'groups',
  model: GroupModel
})
@Injectable()
export class GroupPersistence extends PersistenceService<GroupModel> {

  public async create(doc) {
    // TODO check existence of owner and users
    return super.create(doc);
  }

  public async findAll() {
    // TODO check existence of owner and users
    return super.findAll();
  }

  public async findByOwner(ownerId) {
    return super.findAll({owner: ownerId});
  }

  public async findByMember(userId) {
    return super.findAll({users: userId});
  }
}

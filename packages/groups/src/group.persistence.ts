import { GroupModel } from './group.model';
import { Persistence, PersistenceService } from '@microgamma/datagator';
import { Injectable } from '@microgamma/digator';


@Persistence({
  uri: process.env['MONGOURI'],
  dbName: 'test',
  collection: 'groups',
  model: GroupModel
})
@Injectable()
export class GroupPersistence extends PersistenceService<GroupModel> {

  public async findByOwner(ownerId) {
    return super.findAll({owner: ownerId});
  }

  public async findByMember(userId) {
    return super.findAll({users: userId});
  }
}

import { GroupModel } from './group.model';
import { Persistence} from '@microgamma/datagator';
import { Injectable } from '@microgamma/digator';
import { MongodbService } from '@microgamma/mongodb';


@Persistence({
  uri: process.env['MONGOURI'],
  dbName: 'test',
  collection: 'groups',
  model: GroupModel
})
@Injectable()
export class GroupPersistence extends MongodbService<GroupModel> {

  public async findByOwner(ownerId) {
    return super.findAll({owner: ownerId});
  }

  public async findByMember(userId) {
    return super.findAll({users: userId});
  }
}

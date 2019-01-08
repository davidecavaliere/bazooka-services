import { Column } from '../lib/model/column.decorator';
import { Model } from '../lib/model/model';
import { getDebugger } from '@microgamma/ts-debug';
import { User } from '../users/user.model';

const d = getDebugger('microgamma:group.model');


export class GroupModel extends Model {

  @Column()
  public name: string;

  @Column()
  public users: string[];

  @Column()
  public owner: User;

}


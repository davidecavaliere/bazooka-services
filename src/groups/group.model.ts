import { Column } from '../lib/model/column.decorator';
import { Model } from '../lib/model/model';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:group.model');


export class GroupModel extends Model {

  @Column()
  public _id: string;

  @Column()
  public name: string;

  @Column()
  public users: string[];

  @Column()
  public owner: string;

}


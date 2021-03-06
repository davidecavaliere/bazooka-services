import { BaseModel, Column } from '@microgamma/datagator';

export class GroupModel extends BaseModel<GroupModel> {

  @Column({
    primaryKey: true
  })
  public _id?: string;

  @Column()
  public name: string;

  @Column()
  public users: string[];

  @Column()
  public owner?: string;

}


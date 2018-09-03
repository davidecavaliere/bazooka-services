import { Entity } from '../lib/entity/entity.decorator';
import { MongoCollection } from '../lib/mongo/collection';
import { Column } from '../lib/model/column.decorator';
import { SchemaTypes } from 'mongoose';
import * as crypto from 'crypto';
import { Virtual } from '../lib/model/virtual.decorator';

@Entity({
  // table name
  name: 'user',
  uri:  process.env['MONGODB_ATLAS_CLUSTER_URI']
})
export class User extends MongoCollection {

  @Column({
    type: SchemaTypes.String
  })
  public name: string;

  @Column({ type: SchemaTypes.String, lowercase: true })
  public email: string;

  @Column({
    type: SchemaTypes.String,
    default: 'pawn'
  })
  public role: any;

  @Column({
    type: SchemaTypes.String
  })
  // @Virtual()
  // @Private()
  public hashedPassword: string;


  @Column({
    type: SchemaTypes.String
  })
  // @Virtual()
  // @Private()
  public salt: string;

  @Column({
    type: SchemaTypes.ObjectId
  })
  public company;

  @Column({
    type: {},
    default: {
      welcome: true
    }
  })
  public settings;

}
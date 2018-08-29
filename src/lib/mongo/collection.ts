import { EntityOptions, getEntityMetadata } from '../entity/entity.decorator';
import { Connection, createConnection, Model, Schema } from 'mongoose';
import { getDebugger } from '@microgamma/ts-debug';
import { getColumnMetadata } from '../model/column.decorator';

const d = getDebugger('microgamma:collection');

export abstract class MongoCollection {

  protected collection: EntityOptions = getEntityMetadata(this);
  protected _model: Promise<any>;

  protected async getModel() {
    if (this._model) {
      return this._model;
    } else {
      const connection: Connection = await createConnection(this.collection.uri, {
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0 // and MongoDB driver buffering
      });


      const schemaDef = getColumnMetadata(this);
      d('schemaDef', schemaDef);

      const schema = new Schema(schemaDef);

      connection.model(this.collection.name, schema);

      return connection.model(this.collection.name);

    }
  }

  public async findAll() {
    const model = await this.getModel();
    return (model as Model<any>).find();
  }

  public async findOne(id: string) {
    const model = await this.getModel();
    const doc = await (model as Model<any>).findById(id);
    d('found document', doc);
    if (!doc) {
      throw new Error('[404] document not found');
    } else {
      return doc;
    }
  }

  public async create(doc) {
    const model = await this.getModel();
    return (model as Model<any>).create(doc);
  }

  public async update(doc) {
    const model = await this.getModel();
    return (model as Model<any>).findOneAndUpdate({_id : doc._id}, doc);

  }

  public async delete(id) {
    const model = await this.getModel();
    return (model as Model<any>).findOneAndRemove({_id: id});
  }
}
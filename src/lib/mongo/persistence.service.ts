import { Collection, connect, MongoClient, MongoClientOptions } from 'mongodb';
import { getPersistenceMetadata } from '../di/persistence.decorator';
import { getDebugger } from '@microgamma/ts-debug';
import { ObjectID } from 'bson';

const d = getDebugger('microgamma:persistence.service');


interface MongoQuery {
  [k: string]: string;
}

export abstract class PersistenceService<T> {

  protected uri: string;
  protected options: MongoClientOptions;
  protected dbName: string;
  protected collectionName: string;

  protected _client: MongoClient;
  protected _collection: Collection;

  protected modelFactory(doc): T {
    const model = getPersistenceMetadata(this).model;
    return new model(doc);
  }

  public async getClient(): Promise<MongoClient> {



    if (!this._client) {
      const metadata = getPersistenceMetadata(this);
      d('got metadata', metadata);

      this.uri = metadata.uri;
      this.dbName = metadata.dbName;
      this.collectionName = metadata.collection;
      this.options = metadata.options;

      this._client = await connect(this.uri, this.options);
      this._collection = this._client.db(this.dbName).collection(this.collectionName);
    }

    return this._client;
  }

  public async getCollection(): Promise<Collection> {
    await this.getClient();
    return this._client.db(this.dbName).collection(this.collectionName);
  }


  public async findAll(query?: MongoQuery) {
    return (await this.getCollection()).find(query).toArray();
  }

  public async findOne(id: string) {
    try {
      d('searching document by id', id);
      const objId = new ObjectID(id);
      const doc = await (await this.getCollection()).findOne({_id: objId});
      d('found document', doc);
      if (!doc) {
        throw new Error('[404] document not found');
      } else {
        return doc;
      }
    } catch (e) {
      throw e;
    }
  }

  public async create(doc: T) {
    doc = this.modelFactory(doc);
    return (await this.getCollection()).insertOne(doc);
  }

  public async update(doc) {
    const objId = new ObjectID(doc._id);

    return (await this.getCollection()).findOneAndUpdate({_id: objId}, doc);

  }

  public async delete(id) {
    const objId = new ObjectID(id);
    return (await this.getCollection()).findOneAndDelete({_id: objId});
  }
}
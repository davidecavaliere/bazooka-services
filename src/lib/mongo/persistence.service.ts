import { Collection, connect, MongoClient, MongoClientOptions } from 'mongodb';
import { getPersistenceMetadata } from '../di/persistence.decorator';
import { getDebugger } from '@microgamma/ts-debug';
import { ObjectID } from 'bson';
import { Model } from '../model/model';

const d = getDebugger('microgamma:persistence.service');


interface MongoQuery {
  [k: string]: string;
}

export abstract class PersistenceService<T extends Model> {

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
    const docs = await (await this.getCollection()).find(query).toArray();

    const parsedDocs = [];

    for (let doc of docs) {
      parsedDocs.push(this.modelFactory(doc).toJson());
    }

    return parsedDocs;
  }

  public async findOne(id: string) {
    d(`searching document by id ${id}`);
    const objId = new ObjectID(id);

    // TODO hide not public fields in model

    const doc = await (await this.getCollection()).findOne({_id: objId});

    d('found document', doc);
    if (!doc) {
      throw new Error('[404] document not found');
    } else {
      return this.modelFactory(doc).toJson();
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
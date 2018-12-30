// import { EntityOptions, getEntityMetadata } from '../entity/entity.decorator';
// import { Connection, createConnection, Model, Schema } from 'mongoose';
// import { getDebugger } from '@microgamma/ts-debug';
// import { getColumnMetadata } from '../model/column.decorator';
// import { getVirtualMetadata } from '../model/virtual.decorator';
//
// const d = getDebugger('microgamma:collection');
//
//
// export abstract class MongoCollection {
//
//   protected _schemaDef = getColumnMetadata(this);
//   protected schema = new Schema(this._schemaDef);
//   protected collection: EntityOptions = getEntityMetadata(this);
//   protected _model: Promise<any>;
//
//   protected async getModel() {
//     if (this._model) {
//       return this._model;
//     } else {
//       d('getting connection for', this.collection);
//       const connection: Connection = await createConnection(this.collection.uri, {
//         // Buffering means mongoose will queue up operations if it gets
//         // disconnected from MongoDB and send them when it reconnects.
//         // With serverless, better to fail fast if not connected.
//         bufferCommands: false, // Disable mongoose buffering
//         bufferMaxEntries: 0 // and MongoDB driver buffering
//       });
//
//
//       // d('schemaDef', schemaDef);
//       //
//       // const schema = new Schema(schemaDef);
//       //
//       connection.model(this.collection.name, this.schema);
//
//       // set virtuals
//       const virtuals = getVirtualMetadata(this);
//       d('virtuals', virtuals);
//
//       for (const virtual in virtuals) {
//         d('setting virtual', virtual);
//
//
//
//         d('adding getter', virtuals[virtual]['get']);
//         this.schema.virtual(virtual).get(virtuals[virtual]['get']);
//
//         d('adding setter', virtuals[virtual]['set']);
//         this.schema.virtual(virtual).get(virtuals[virtual]['set']);
//
//         // const _v = schema.virtual(virtual);
//         // if (virtuals[virtual].hasOwnProperty('set')) {
//         //   _v.set(virtuals[virtual]['set'].bind(this));
//         // }
//         //
//         // if (virtuals[virtual].hasOwnProperty('get')) {
//         //   d('adding getter', virtuals[virtual]['get']);
//         //   _v.get(virtuals[virtual]['get'].bind(this));
//         // }
//
//
//       }
//
//       return connection.model(this.collection.name);
//
//     }
//   }
//
//   public async findAll() {
//     const model = await this.getModel();
//     return (model as Model<any>).find();
//   }
//
//   public async findOne(id: string) {
//     const model = await this.getModel();
//     const doc = await (model as Model<any>).findById(id);
//     d('found document', doc);
//     if (!doc) {
//       throw new Error('[404] document not found');
//     } else {
//       return doc;
//     }
//   }
//
//   public async create(doc) {
//     const model = await this.getModel();
//     return (model as Model<any>).create(doc);
//   }
//
//   public async update(doc) {
//     const model = await this.getModel();
//     return (model as Model<any>).findOneAndUpdate({_id : doc._id}, doc);
//
//   }
//
//   public async delete(id) {
//     const model = await this.getModel();
//     return (model as Model<any>).findOneAndRemove({_id: id});
//   }
// }
import { getDebugger } from '@microgamma/ts-debug';
import { MongoClientOptions } from 'mongodb';

const d = getDebugger('microgamma:persistence.decorator');

const PersistenceMetadata = Symbol('Persistence');

export interface PersistenceServiceOptions {
  collection: string;
  uri: string;
  dbName: string;
  options?: MongoClientOptions;
  model: any;
}

export function Persistence(options: PersistenceServiceOptions): ClassDecorator {

  d('running persistence decorator');

  return <TFunction extends Function>(target: TFunction) => {

    d('target', target);
    d('options', options);

    Reflect.metadata(PersistenceMetadata, options)(target);
    d('metadata stored', Reflect.getMetadata(PersistenceMetadata, target));
  };
}

export function getPersistenceMetadata(instance): PersistenceServiceOptions {
  const metadata = Reflect.getMetadata(PersistenceMetadata, instance.constructor);
  d('getting persistence metadata', metadata);
  return metadata;
}

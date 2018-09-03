import { getDebugger } from '@microgamma/ts-debug';
import { Types } from 'mongoose/lib/schema';

const d = getDebugger('microgamma:inject.decorator');

const PersistenceMetadata = Symbol('Persistence');


export function Persistence(persistenceService): ClassDecorator {

  d('running inject decorator');

  return <TFunction extends Function>(target: TFunction) => {

    d('target', target);

    Reflect.defineMetadata(PersistenceMetadata, persistenceService, target);
  };
}

export function getPersistenceMetadata(instance): (...args) => void {
  d('getting persistence class', instance.constructor);
  return Reflect.getMetadata(PersistenceMetadata, instance.constructor);
}

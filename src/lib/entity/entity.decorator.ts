import 'reflect-metadata';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:entity.decorator');

const EntityMetadata = Symbol('Entity');

export interface EntityOptions {
  readonly name: string;
  readonly uri: string;
}

export function Entity(options: EntityOptions): ClassDecorator {
  d('decorating with', options);

  return <TFunction extends Function>(target: TFunction) => {
    d('decorating', target.constructor.name);


    d(target.constructor.toString());


    return Reflect.metadata(EntityMetadata, options)(target);

  };
}

export function getEntityMetadata(instance) {
  return Reflect.getMetadata(EntityMetadata, instance.constructor);
}

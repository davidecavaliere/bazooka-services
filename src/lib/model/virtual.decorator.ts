import { getDebugger } from '@microgamma/ts-debug';
import { Types } from 'mongoose/lib/schema';
import { SchemaDefinition } from 'mongoose';

const d = getDebugger('microgamma:virtual.decorator');

const VirtualMetadata = Symbol('Virtual');

export interface VirtualOptions {
  (...args: any[]);
}

export function Virtual(options?: VirtualOptions): PropertyDecorator {

  d('running virtual decorator');

  return <TFunction extends Function>(target: TFunction, propertyKey) => {

    d('property key', propertyKey);
    d('typeof property key', typeof propertyKey);

    const virtuals: SchemaDefinition = getVirtualMetadata(target);

    virtuals[propertyKey] = options;

    d('target is', target);
    d('setting schema def', virtuals);

    Reflect.defineMetadata(VirtualMetadata, virtuals, target);
  };
}

export function getVirtualMetadata(instance): SchemaDefinition {
  const metadata = Reflect.getMetadata(VirtualMetadata, instance);
  return metadata || {};
}

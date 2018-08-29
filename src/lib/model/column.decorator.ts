import { getDebugger } from '@microgamma/ts-debug';
import { Types } from 'mongoose/lib/schema';
import { SchemaDefinition } from 'mongoose';

const d = getDebugger('microgamma:column.decorator');

const ColumnMetadata = Symbol('Column');

export interface ColumnOptions {
  readonly type: Types;
  readonly default?: any; // ??? what should be a good type here???
  readonly lowercase?: boolean;
  fieldType?: any;
}

export function Column(options?: ColumnOptions): PropertyDecorator {

  d('running column decorator');

  return <TFunction extends Function>(target: TFunction, propertyKey) => {

    d('property key', propertyKey);
    d('typeof property key', typeof propertyKey);

    const schemaDef: SchemaDefinition = getColumnMetadata(target);

    schemaDef[propertyKey] = options;

    d('target is', target);
    d('setting schema def', schemaDef);

    Reflect.defineMetadata(ColumnMetadata, schemaDef, target);
  };
}

export function getColumnMetadata(instance): SchemaDefinition {
  const metadata = Reflect.getMetadata(ColumnMetadata, instance);
  return metadata || {};
}

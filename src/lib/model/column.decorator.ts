import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:column:decorator');

const ColumnMetadata = Symbol('Column');

export interface ColumnOptions {
  regex?: RegExp;
}

export function Column(options?: ColumnOptions): PropertyDecorator {

  d('-------------------', options);

  return <TFunction extends Function, K extends keyof TFunction>(target: TFunction, propertyKey: K) => {

    d('property key', propertyKey);
    d('typeof', typeof propertyKey);

    Reflect.defineMetadata(ColumnMetadata, options, target);
  };
}

export function getColumnMetadata(instance): ColumnOptions {
  const metadata = Reflect.getMetadata(ColumnMetadata, instance);
  return metadata || {};
}

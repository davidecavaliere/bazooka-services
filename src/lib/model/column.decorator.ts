import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:column:decorator');

export const ColumnMetadata = Symbol('Column');

export interface ColumnOptions {
  regex?: RegExp;
  /**
   * if set to true the field will not be returned when .toJson the Model
   */
  private: boolean;
}

export function Column(options?: ColumnOptions): PropertyDecorator {

  return <TFunction extends Function>(target: TFunction, propertyKey: string) => {

    Object.defineProperty(target, propertyKey, {
      get: function() {
        // d('getting through getter');
        return this['_' + propertyKey];
      },
      set: function(value) {
        // d('setting through setter');
        
        // if (value) {
        //   throw Error('@Column: invalid value.');
        // }
        
        this['_' + propertyKey] = value;
      },
      enumerable: true,
      configurable: true
    });


    d('property key', propertyKey);
    d('typeof', typeof propertyKey);

    const columns = getColumnMetadata(target);

    columns[propertyKey] = options;

    Reflect.defineMetadata(ColumnMetadata, columns, target);
  };
}

export function getColumnMetadata(instance): { [k: string]: {} } {
  const metadata = Reflect.getMetadata(ColumnMetadata, instance);
  return metadata || {};
}

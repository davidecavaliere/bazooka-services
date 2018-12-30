import 'reflect-metadata';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:model:decorator');

const ModelMetadata = Symbol('Model');

export interface ModelOptions {
  readonly name: string;
}

export function Model(options: ModelOptions) {
  d('running model decorator with', options);
  return <TFunction extends new (...args) => any>(target: TFunction) => {
    // console.log('decorating a class', target);



    Reflect.metadata(ModelMetadata, options)(target);

  };
}

export function getModelMetadata(instance) {
  d('getting model decorator');
  return Reflect.getMetadata(ModelMetadata, instance.constructor);
}

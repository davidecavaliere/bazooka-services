import 'reflect-metadata';

const ModelMetadata = Symbol('Model');

export interface ModelOptions {
  readonly name: string;
}

export function Model(options: ModelOptions): ClassDecorator {
  // console.log('constructing a class decorator', options)
  return <TFunction extends Function>(target: TFunction) => {
    // console.log('decorating a class', target);
    Reflect.metadata(ModelMetadata, options)(target);
  };
}

export function getModelMetadata(instance) {
  return Reflect.getMetadata(ModelMetadata, instance.constructor);
}

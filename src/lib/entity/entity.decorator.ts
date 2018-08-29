import 'reflect-metadata';

const EntityMetadata = Symbol('Entity');

export interface EntityOptions {
  readonly name: string;
  readonly uri: string;
}

export function Entity(options: EntityOptions): ClassDecorator {
  // console.log('constructing a class decorator', options)
  return <TFunction extends Function>(target: TFunction) => {
    // console.log('decorating a class', target);
    Reflect.metadata(EntityMetadata, options)(target);
  };
}

export function getEntityMetadata(instance) {
  return Reflect.getMetadata(EntityMetadata, instance.constructor);
}

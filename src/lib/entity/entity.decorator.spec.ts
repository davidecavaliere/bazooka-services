// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getEntityMetadata, Entity, EntityOptions } from './entity.decorator';
import { Log, setNamespace } from '@microgamma/ts-debug/build/main/lib/log.decorator';

const options: EntityOptions = {
  name: 'entity-name',
  uri: 'mongodb-uri'
};

setNamespace('lambda:entity:decorator');

@Entity(options)
class TestClass {
  @Log() public $l;

  constructor() {
    this.$l.d('instantiating', this.constructor.name);
  }
}

let instance: TestClass;

test.beforeEach(() => {
  instance = new TestClass();
});

test('entityntity decorator', t => {
  // console.log('instance', instance);
  t.is(instance instanceof TestClass, true);
});

test('should store some metadata', t => {
  t.is(getEntityMetadata(instance), options);
});

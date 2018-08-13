// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getModelMetadata, Model, ModelOptions } from './model.decorator';
import { Log, setNamespace } from '@microgamma/ts-debug/build/main/lib/log.decorator';

const options: ModelOptions = {
  name: 'model-name'
};

setNamespace('lambda:model:decorator');

@Model(options)
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

test('model decorator', t => {
  // console.log('instance', instance);
  t.is(instance instanceof TestClass, true);
});

test('should store some metadata', t => {
  t.is(getModelMetadata(instance), options);
});

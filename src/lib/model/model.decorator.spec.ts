// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getModelMetadata, Model, ModelOptions } from './model.decorator';
import { Log, setNamespace } from '@microgamma/ts-debug/build/main/lib/log.decorator';

const options: ModelOptions = {
  name: 'modelFactory-name'
};

@Model(options)
class TestClass {

  constructor() {
    console.log('running original constructor');
  }
}

let instance: TestClass;

test.beforeEach(() => {
  instance = new TestClass();
});

test('model decorator', t => {
  console.log('instance', instance);

});

// test('should store some metadata', t => {
//   t.is(getModelMetadata(instance), options);
// });

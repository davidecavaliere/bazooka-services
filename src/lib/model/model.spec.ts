// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { BaseModel } from './model';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:model:spec');

class MyModel extends BaseModel<MyModel> {

  public name: string;

}

let instance: MyModel;

test.beforeEach(() => {
  instance = new MyModel({
    name: 'my-name'
  })
});

test.skip('BaseModel', t => {


  t.deepEqual(instance, {
    name: 'my-name'
  });

});

test('should store some metadata', t => {
});

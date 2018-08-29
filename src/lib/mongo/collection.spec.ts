// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { MongoCollection } from './collection';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:collection');

class MyCollection extends MongoCollection {

  public name: string;
}

test.beforeEach((t) => {


});

test.only('collection', t => {
  d('instance', t);
  t.is(true, true);
});


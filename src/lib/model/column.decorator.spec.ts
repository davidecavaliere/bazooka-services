// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { Entity, EntityOptions } from '../entity/entity.decorator';
import { getDebugger } from '@microgamma/ts-debug';
import { Column, getColumnMetadata } from './column.decorator';
import { SchemaTypes } from 'mongoose';

const d = getDebugger('microgamma:column.decorator');


const options: EntityOptions = {
  name: 'entity-name',
  uri: 'mongodb-uri'
};


type MyString = string;

@Entity(options)
class TestClass {

  @Column({
    type: SchemaTypes.String
  })
  public name: MyString;

  @Column({
    type: SchemaTypes.String
  })
  public email: string;
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

  d('schema definition', getColumnMetadata(instance));

  // t.deepEqual(getColumnMetadata(instance), [{
  //   type: SchemaTypes.String
  // }, {
  //   type: SchemaTypes.String
  // }]);
});

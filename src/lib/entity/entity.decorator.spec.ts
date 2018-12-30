// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { Entity, EntityOptions, getEntityMetadata } from './entity.decorator';
import { getDebugger } from '@microgamma/ts-debug';
import { Column, getColumnMetadata } from '../model/column.decorator';

const d = getDebugger('microgamma:entity.decorator.spec');

const options: EntityOptions = {
  name: 'entity-name',
  uri: 'mongodb-uri'
};


@Entity(options)
class TestClass {


  constructor() {
    d('running original constructor');
    d('running original constructor');
  }

  @Column()
  private name: string;

  @Column()
  private email: string;
}

let instance: TestClass;

test.beforeEach(() => {
  instance = new TestClass();

});

test('entity decorator', t => {
  t.is(instance instanceof TestClass, true);

  t.deepEqual(getColumnMetadata(instance), { });
});



test('should store some metadata', t => {
  t.is(getEntityMetadata(instance), options);
});






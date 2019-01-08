// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getDebugger } from '@microgamma/ts-debug';
import { Column, getColumnMetadata } from './column.decorator';
import { Model } from './model';

const d = getDebugger('microgamma:column.decorator');



type MyString = string;

class TestClass extends Model {

  @Column()
  public name: MyString;

  @Column()
  public email: string;

  @Column({
    private: true
  })
  public password: string;
}

let instance: TestClass;

test.beforeEach(() => {
  instance = new TestClass({
    name: 'a-name',
    email: 'an-email',
    password: 'a-password'
  });
});

test('should store metadata', (t) => {

  t.deepEqual(getColumnMetadata(instance), {
    email: undefined,
    name: undefined,
    password: {
      private: true
    }
  })
});

test('should serialize to json', (t) => {
  const json = instance.toJson();
  t.deepEqual(json, {
    name: 'a-name',
    email: 'an-email'
  });
});

test('should add getter and setter', (t)=> {
  instance.email = 'my-email';
  t.is(instance.email, 'my-email');
});

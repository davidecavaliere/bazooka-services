// tslint:disable:no-expression-statement no-object-mutation
import test from 'ava';
import { getDebugger } from '@microgamma/ts-debug';
import { Column } from './column.decorator';

const d = getDebugger('microgamma:column.decorator');



type MyString = string;

class TestClass {

  @Column()
  public name: MyString;

  @Column()
  public email: string;
}

let instance: TestClass;

test.beforeEach(() => {
  instance = new TestClass();
});

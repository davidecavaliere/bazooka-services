import { getColumnMetadata } from './column.decorator';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:model.ts');

export class Model {

  constructor(arg) {

    d('instance is', this);

    Object.assign(this, arg);
  }

  public toJson?(): any {
    const columns = getColumnMetadata(this);
    console.log('columns meta', columns);

    const json = {};

    for (let key in columns) {
      if (!(columns[key] && columns[key]['private'])) {
        json[key] = this[key];
      }
    }

    return json;
  }

}
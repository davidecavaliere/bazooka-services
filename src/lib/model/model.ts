
export class BaseModel<T> {

  constructor(arg: T) {
    Object.assign(this, arg);
  }

}
import { Model } from '../lib/model/model.decorator';

@Model({
  // table name
  name: 'user'
})
export class User {
  public name: String;
  
  // @Format('toLowerCase')
  public email: String;
  
  public role: Role;
  
  // @Protected()
  public hashedPassword: String;
  
  public provider: String;
  
  // @Protected()
  public salt: String;
  
  public avatar : String;

  public company : {};
  public settings : {};

  constructor() {


  }
}
import crypto = require('crypto');
import { BaseModel, Column } from '@microgamma/datagator';
import { getDebugger } from '@microgamma/loggator';

const d = getDebugger('microgamma:user.model');


export class User extends BaseModel<User> {


  @Column({
    primaryKey: true
  })
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public role: string;

  @Column({
    private: true
  })
  public hashedPassword?: string;

  @Column()
  public token?: string;

  @Column({
    private: true
  })
  public salt?: string;

  @Column()
  public realms? = [];

  @Column()
  public settings?;


  public set password(password) {
    d('this in setter function is', this);
      d('setting password', password);
      if (!this.salt) {
        this.salt = User.makeSalt();
      }
      d('this.salt', this.salt);
      this.hashedPassword = this.encryptPassword(password);
      d('encryptedPassword', this.hashedPassword);
      d('this is', this);

  };

  private static makeSalt(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  private encryptPassword(password) {

    d('salt is ', this.salt);
    return crypto.createHmac('sha256', this.salt)
      .update(password)
      .digest('hex');
  }

  public authenticate(password: string): boolean {
    d('checking passowrd', password);
    d('this.hashedPassword', this.hashedPassword);
    return this.encryptPassword(password) === this.hashedPassword;
  }

}


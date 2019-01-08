import { Column } from '../lib/model/column.decorator';
import { getDebugger } from '@microgamma/ts-debug';
import crypto = require('crypto');
import { Model } from '../lib/model/model';

const d = getDebugger('microgamma:user.model');


export class User extends Model {

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public role: any  = 'pawn';

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
      this.salt = User.makeSalt();
      d('this.salt', this.salt);
      this.hashedPassword = User.encryptPassword(password, this.salt);
      d('encryptedPassword', this.hashedPassword);
      d('this is', this);

  };

  private static makeSalt(): string {
    return crypto.randomBytes(16).toString('base64');
  }

  public static encryptPassword(password, salt) {
    return crypto.createHmac('sha256', salt)
      .update(password)
      .digest('hex');
  }

}


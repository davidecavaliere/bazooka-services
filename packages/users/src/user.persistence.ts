import { User } from './user.model';
import { sign } from 'jsonwebtoken';
import { getDebugger } from '@microgamma/loggator';
import { Persistence, PersistenceService } from '@microgamma/datagator';
import { Injectable } from '@microgamma/digator';

const d = getDebugger('microgamma:user.persistence.service');

@Persistence({
  uri: process.env['MONGOURI'],
  dbName: 'test',
  collection: 'users',
  model: User
})
@Injectable()
export class UserPersistenceService extends PersistenceService<User> {

  public async authenticate({email, password}) {
    const user = await (await this.getCollection()).findOne({ email: email });
    if (!user) {
      // @ts-ignore
      throw new Error('[403] Unable to authenticate user');
    }

    d('user found', user);
    d('hashed password', user.hashedPassword);
    d('hash from given password', User.encryptPassword(password, user.salt));
    if ( User.encryptPassword(password, user.salt) === user.hashedPassword) {

      user.token = sign(user, process.env['SECRET']);

      return new User(user).toJson();
    } else {
      // @ts-ignore
      throw new Error('[403] Unable to authenticate');
    }

  }
}

import { Persistence } from '../lib/di/persistence.decorator';
import { PersistenceService } from '../lib/mongo/persistence.service';
import { User } from './user.model';
import { getDebugger } from '@microgamma/ts-debug';
import { sign } from 'jsonwebtoken';
import { Injectable } from '@microgamma/apigator/build/main/lib/di/injectable.decorator';

const d = getDebugger('microgamma:user.persistence.service');

@Persistence({
  uri: process.env['MONGODB_ATLAS_CLUSTER_URI'] || 'mongodb://192.168.254.2:27017/test',
  dbName: 'test',
  collection: 'users',
  model: User
})
@Injectable()
export class UserPersistenceService extends PersistenceService<User> {

  public async authenticate({email, password}) {
    const user = await (await this.getCollection()).findOne({ email: email });
    if (!user) {
      throw new Error('[403] Unable to authenticate user');
    }

    d('user found', user);
    d('hashed password', user.hashedPassword);
    d('hash from given password', User.encryptPassword(password, user.salt));
    if ( User.encryptPassword(password, user.salt) == user.hashedPassword) {
      // TODO use public accessible fields in <model> to only send those through token

      user.token = sign(user, process.env['SECRET']);

      return user;
    } else {
      throw new Error('[403] Unable to authenticate user');
    }

  }
}
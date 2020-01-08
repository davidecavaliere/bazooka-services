import { User } from './user.model';
import { sign } from 'jsonwebtoken';
import { getDebugger } from '@microgamma/loggator';
import { Injectable } from '@microgamma/digator';
// tslint:disable-next-line:no-implicit-dependencies
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Persistence } from '@microgamma/datagator';
import { DynamodbService } from '@microgamma/dynamodb';

const d = getDebugger('microgamma:user.persistence.service');

@Persistence({
  tableName: process.env.DYNAMODB_TABLE,
  model: User,
  options: {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
  }
})
@Injectable()
export class UserPersistenceService extends DynamodbService<User> {

  public async authenticate({email, password}) {

    d('quering for user', email, password);

    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#email = :email',
      ExpressionAttributeNames:{
        '#email': 'email'
      },
      ExpressionAttributeValues: {
        ':email': email
      }
    };


    const user = await (this.ddb as DocumentClient).query(params).promise();

    if (!user) {

      throw new Error(`[403] Unable to authenticate user: ${email}`);
    }



    d('user found', user);

    // TODO be defensive
    const parsedUser: User = this.modelFactory(user.Items[0]);
    d('parsedUser', parsedUser);


    if (parsedUser.authenticate(password)) {

      parsedUser.token = sign(parsedUser.toJSON(), process.env['SECRET']);

      return parsedUser;
    } else {
      // @ts-ignore
      throw new Error(`[403] Unable to authenticate user: ${email}`);
    }

  }
}

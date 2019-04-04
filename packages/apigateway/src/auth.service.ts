import { Authorizer, Endpoint } from '@microgamma/apigator';
import { verify } from 'jsonwebtoken';
import { getDebugger } from '@microgamma/loggator';
import { Injectable } from '@microgamma/digator';

const d = getDebugger('microgamma:auth:service');


@Endpoint({
  name: 'AuthService',
  cors: true
})
@Injectable()
export class AuthService {

  /*
    example event auth context on AWS

    enhancedAuthContext: {
      principalId: '5b9532e32782813d49043f0b',
      user: '5b9532e32782813d49043f0b'
    }
   */

  @Authorizer({
    name: 'generalAuthorizer'
  })
  public async generalAuthorizer(token, resource) {
    d('got token', token);
    d('got resource', resource);
    const decoded = verify(token, process.env['SECRET']);
    d('decoded token', decoded);

    return decoded;
  }

}

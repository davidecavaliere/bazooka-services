import { Authorizer, Endpoint } from '@microgamma/apigator';
import { verify } from 'jsonwebtoken';
import { Log } from '@microgamma/loggator';
import { Injectable } from '@microgamma/digator';


@Endpoint({
  name: 'AuthService',
  cors: true
})
@Injectable()
export class AuthService {
  @Log('microgamma:auth:service')
  private $l;

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

    this.$l.d('got token', token);
    this.$l.d('got resource', resource);
    const decoded = verify(token, process.env['SECRET']);
    this.$l.d('decoded token', decoded);


    return decoded['id'];
  }

}

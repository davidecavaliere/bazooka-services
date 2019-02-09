import { Endpoint, Lambda } from '@microgamma/apigator';
import { verify } from 'jsonwebtoken';
import { getDebugger } from '@microgamma/loggator';
import { Injectable } from '@microgamma/digator';

const d = getDebugger('microgamma:auth:service');


@Endpoint({
  name: 'AuthService',
  cors: true,
  basePath: '/auth'
})
@Injectable()
export class AuthService {

  @Lambda({
    path: '/',
    method: 'GET'
  })
  public async jwtTokenValidator(event) {
    d('event is', event);
    // d('got token', token);
    // d('got resource', resource);
    // const decoded = verify(token, process.env['SECRET']);
    // d('decoded token', decoded);

    // return decoded['_id'];
    return true;
  }

}

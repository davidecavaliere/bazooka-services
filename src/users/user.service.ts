import { User } from './user.model';
import { Lambda,  Endpoint } from '@microgamma/apigator';
import { getDebugger } from '@microgamma/ts-debug';
import { Persistence } from '../lib/di/persistence.decorator';
import { RestApiService } from '../lib/rest-api/rest-api.service';

const d = getDebugger('microgamma:service:user');

@Endpoint({
  name: 'UserEndpoint',
  private: true,
  cors: true
})
@Persistence(User)
export class UserService extends RestApiService {

  @Lambda({
    name: 'findAll',
    path: '/',
    method: 'GET'
  })
  public async findAll() {
    return this.persistenceService.findAll();
  }

  @Lambda({
    name: 'findById',
    path: '/{id}',
    method: 'GET'
  })
  public async findById(id) {
    return this.persistenceService.findOne(id);
  }

  @Lambda({
    name: 'create',
    path: '/',
    method: 'POST'
  })
  public async create(email, password) {
    console.log('email, password', email, password);
    return this.persistenceService.create({
      email, password
    });
  }

  @Lambda({
    name: 'update',
    path: '/',
    method: 'PUT'
  })
  public async update (body) {
    return this.persistenceService.update(body);
  }

  @Lambda({
    name: 'remove',
    path: '/{id}',
    method: 'DELETE'
  })
  public async remove(id) {
    return this.persistenceService.delete(id);
  }


}
import { User } from './user.model';
import { Lambda,  Endpoint } from '@microgamma/apigator';
import { getDebugger } from '@microgamma/ts-debug';

const d = getDebugger('microgamma:service:user');

@Endpoint({
  name: 'UserEndpoint'
})
export class UserService {
  private userPersistence = new User();

  constructor() {
    d('running constructor');
  }

  @Lambda({
    name: 'findAll',
    path: '/',
    method: 'GET',
    cors: true,
    private: true
  })
  public async findAll() {
    return this.userPersistence.findAll();
  }

  @Lambda({
    name: 'findById',
    path: '/{id}',
    method: 'GET',
    cors: true,
    private: true
  })
  public async findById(id) {
    return this.userPersistence.findOne(id);
  }

  @Lambda({
    name: 'create',
    path: '/',
    method: 'POST',
    cors: true,
    private: true
  })
  public async create(email, password) {
    console.log('email, password', email, password);
    return this.userPersistence.create({
      email, password
    });
  }

  @Lambda({
    name: 'update',
    path: '/',
    method: 'PUT',
    cors: true,
    private: true
  })
  public async update (body) {
    return this.userPersistence.update(body);
  }

  @Lambda({
    name: 'remove',
    path: '/{id}',
    method: 'DELETE',
    cors: true,
    private: true
  })
  public async remove(id) {
    return this.userPersistence.delete(id);
  }

}
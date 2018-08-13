import { Endpoint, Service } from '@microgamma/apigator';

@Service({
  name: 'UserService'
})
export class UserService {

  @Endpoint({
    name: 'findAll',
    path: '/',
    method: 'GET'
  })
  public findAll() {
    return [{
      id: 1,
      title: 'Il nome della rosa',
      author: 'Umberto Eco'
    }];
  }

  @Endpoint({
    name: 'findById',
    path: '/:id',
    method: 'GET'
  })
  public findById(id) {
    return {
      id: id,
      title: 'Il nome della rosa',
      author: 'Umberto Eco'
    }
  }

  @Endpoint({
    name: 'create',
    path: '/',
    method: 'POST'
  })

  public create(body) {
    console.log('need to get post body here', body);
    return body;
  }

  @Endpoint({
    name: 'update',
    path: '/:id',
    method: 'PUT'
  })
  public update () {}

  @Endpoint({
    name: 'remove',
    path: '/:id',
    method: 'DELETE'
  })
  public remove() {}

}
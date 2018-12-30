import { bootstrap, Service, Inject } from '@microgamma/apigator';
import { UserService } from './users/user.service';

export = bootstrap(UserService);

class MyService extends Service {

  @Inject(UserService)
  public userService: UserService;
}
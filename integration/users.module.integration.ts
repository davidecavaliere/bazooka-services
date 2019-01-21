import { UserService } from '@bazooka/users/lib/user.service';

const mo = require('../packages/users/static/handler');

const user = new UserService();

console.log('users integration test', user);
console.log('from static', mo);

const fromHandler = require('../packages/users/lib/handler');
console.log('from handler', fromHandler);


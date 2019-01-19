var apigator_1 = require('@microgamma/apigator');
var user_service_1 = require('./user.service');
module.exports = apigator_1.bootstrap(user_service_1.UserService);

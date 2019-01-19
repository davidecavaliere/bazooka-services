var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var apigator_1 = require('@microgamma/apigator');
var user_persistence_1 = require('./user.persistence');
var jsonwebtoken_1 = require('jsonwebtoken');
var loggator_1 = require('@microgamma/loggator');
var d = loggator_1.getDebugger('microgamma:user.service');
var UserService = (function () {
    function UserService() {
        this.async = findAll();
    }
    __decorate([
        apigator_1.Inject(user_persistence_1.UserPersistenceService)
    ], UserService.prototype, "persistence");
    __decorate([
        apigator_1.Lambda({
            name: 'findAll',
            path: '/',
            method: 'GET',
            authorizer: 'authorize'
        })
    ], UserService.prototype, "async");
    UserService = __decorate([
        apigator_1.Endpoint({
            name: 'UserEndpoint',
            cors: true,
            basePath: '/users'
        }),
        apigator_1.Injectable()
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
{
    return this.persistence.findAll();
}
async;
findById(id);
{
    return this.persistence.findOne(id);
}
async;
create(body);
{
    d('saving user', body);
    return this.persistence.create(body);
}
async;
update(body);
{
    return this.persistence.update(body);
}
async;
remove(id);
{
    return this.persistence.delete(id);
}
async;
authenticate(body);
{
    d('authenticating user with', body);
    return this.persistence.authenticate({ email: body.email, password: body.password });
}
async;
authorize(token, resource);
{
    d('got token', token);
    d('got resource', resource);
    var decoded = jsonwebtoken_1.verify(token, process.env['SECRET']);
    d('decoded token', decoded);
    return decoded['_id'];
}

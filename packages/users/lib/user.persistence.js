var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var user_model_1 = require('./user.model');
var jsonwebtoken_1 = require('jsonwebtoken');
var loggator_1 = require('@microgamma/loggator');
var datagator_1 = require('@microgamma/datagator');
var apigator_1 = require('@microgamma/apigator');
var d = loggator_1.getDebugger('microgamma:user.persistence.service');
var UserPersistenceService = (function (_super) {
    __extends(UserPersistenceService, _super);
    function UserPersistenceService() {
        _super.apply(this, arguments);
        this.async = authenticate({ email: email, password: password });
    }
    UserPersistenceService = __decorate([
        datagator_1.Persistence({
            uri: process.env['MONGODB_ATLAS_CLUSTER_URI'] || 'mongodb://192.168.254.2:27017/test',
            dbName: 'test',
            collection: 'users',
            model: user_model_1.User
        }),
        apigator_1.Injectable()
    ], UserPersistenceService);
    return UserPersistenceService;
})(datagator_1.PersistenceService);
exports.UserPersistenceService = UserPersistenceService;
{
    var user = await(await, this.getCollection()).findOne({ email: email });
    if (!user) {
        throw new Error('[403] Unable to authenticate user');
    }
    d('user found', user);
    d('hashed password', user.hashedPassword);
    d('hash from given password', user_model_1.User.encryptPassword(password, user.salt));
    if (user_model_1.User.encryptPassword(password, user.salt) == user.hashedPassword) {
        // TODO use public accessible fields in <model> to only send those through token
        user.token = jsonwebtoken_1.sign(user, process.env['SECRET']);
        return new user_model_1.User(user).toJson();
    }
    else {
        throw new Error('[403] Unable to authenticate');
    }
}

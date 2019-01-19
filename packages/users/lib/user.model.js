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
var crypto = require('crypto');
var datagator_1 = require('@microgamma/datagator');
var loggator_1 = require('@microgamma/loggator');
var d = loggator_1.getDebugger('microgamma:user.model');
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
        this.role = 'pawn';
        this.realms = [];
    }
    Object.defineProperty(User.prototype, "password", {
        set: function (password) {
            d('this in setter function is', this);
            d('setting password', password);
            this.salt = User.makeSalt();
            d('this.salt', this.salt);
            this.hashedPassword = User.encryptPassword(password, this.salt);
            d('encryptedPassword', this.hashedPassword);
            d('this is', this);
        },
        enumerable: true,
        configurable: true
    });
    ;
    User.makeSalt = function () {
        return crypto.randomBytes(16).toString('base64');
    };
    User.encryptPassword = function (password, salt) {
        return crypto.createHmac('sha256', salt)
            .update(password)
            .digest('hex');
    };
    __decorate([
        datagator_1.Column()
    ], User.prototype, "_id");
    __decorate([
        datagator_1.Column()
    ], User.prototype, "name");
    __decorate([
        datagator_1.Column()
    ], User.prototype, "email");
    __decorate([
        datagator_1.Column()
    ], User.prototype, "role");
    __decorate([
        datagator_1.Column({
            private: true
        })
    ], User.prototype, "hashedPassword");
    __decorate([
        datagator_1.Column()
    ], User.prototype, "token");
    __decorate([
        datagator_1.Column({
            private: true
        })
    ], User.prototype, "salt");
    __decorate([
        datagator_1.Column()
    ], User.prototype, "realms");
    __decorate([
        datagator_1.Column()
    ], User.prototype, "settings");
    return User;
})(datagator_1.BaseModel);
exports.User = User;

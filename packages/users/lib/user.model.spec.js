// tslint:disable:no-expression-statement no-object-mutation
var ava_1 = require('ava');
var user_model_1 = require('./user.model');
var loggator_1 = require('@microgamma/loggator');
var d = loggator_1.getDebugger('microgamma:user.model.spec');
var instance;
var user = {
    password: 'my-password',
    company: 'my-realms',
    email: 'email',
    name: 'my-name',
    role: 'pawn'
};
ava_1["default"].beforeEach(function () {
    d('running user modelFactory tests');
});
ava_1["default"]('user modelFactory', function (t) {
    instance = new user_model_1.User(user);
    d('instance', instance);
    t.is(instance instanceof user_model_1.User, true);
    t.is(instance.name, user.name);
    t.is(instance.email, user.email);
    // TODO add the following checks
    // t.is(instance.hashedPassword, );
    // t.is(instance.salt, 'abc');
    // t.is(instance.realms, 'testcompany');
    t.deepEqual(instance.settings, undefined);
});
// test('should have a schema definition', t => {
//   t.deepEqual(getColumnMetadata(instance), {});
// });
//
// test('should have collection metadata', t => {
//   // t.deepEqual(instance['collection'], {});
// });
// test('should connect to db when trying to getModel()', t => {
//   t.plan(1);
//   return instance.findAll().then((docs) => {
//     d('found docs', docs);
//     t.is(true, true);
//   });
//
// });

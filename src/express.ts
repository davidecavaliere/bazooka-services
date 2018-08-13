import debug = require('debug');
import express = require('express');
import bodyParser = require('body-parser');
import { boostrap } from '@microgamma/apigator';
import { getEndpointMetadata, getServiceMetadata } from '@microgamma/apigator';
import 'reflect-metadata';
import { UserService } from './users/user.service';

const d: debug.IDebugger = debug('lambda:example:express.ts');

const app = express();

// get port from environment and store in Express.
const port = 8080;
app.set('port', port);

app.use(bodyParser.json());


// add error handler
// server.on('error', onError);

// start listening on port
// server.on('listening', onListening);

const service: UserService = boostrap(UserService, '');
d('service', getServiceMetadata(UserService));


app.get('/echo/:word', (req, res) => {
  res.json(req.params.word);
});

const endpoints = getEndpointMetadata(service);
d('endpoints', endpoints);

for (const endpoint of endpoints) {
  d('adding endpoint', endpoint);

  d('adding method', endpoint.method.toLowerCase());
  app[endpoint.method.toLowerCase()](endpoint.path, (req, res) => {

    d('params', req.params);
    d('body', req.body);
    service[endpoint.name].apply(service, [
      parseExpressJSRequest(req), // event
      null, // context
      (...args) => {
        d('calling callback with', args);
        const retValue = args[1];
        res.json(retValue);
      }// cb
    ]);

  });

}

app.listen(port, () => {
  console.log(`express is running on port ${port}`);
});


function parseExpressJSRequest(req) {
  let event = req.params;
  console.log('body is', req.body);
  event['body'] = req.body;
  return event;
}
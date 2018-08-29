import debug = require('debug');
import express = require('express');
import bodyParser = require('body-parser');
import 'reflect-metadata';
import { UserService } from './users/user.service';
import { boostrap, getEndpointMetadata, getLambdaMetadata } from '@microgamma/apigator';

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
d('service', getEndpointMetadata(UserService));


app.get('/echo/:word', (req, res) => {
  res.json(req.params.word);
});

const lambdas = getLambdaMetadata(service);
d('lambdas', lambdas);

for (const lambda of lambdas) {
  d('adding lambda', lambda);

  d('adding method', lambda.method.toLowerCase());
  app[lambda.method.toLowerCase()](lambda.path, (req, res) => {

    d('params', req.params);
    d('body', req.body);
    service[lambda.name].apply(service, [
      parseExpressJSRequest(req), // event
      res, // context
      (...args) => {
        // d('calling callback with', args);
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

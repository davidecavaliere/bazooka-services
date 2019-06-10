#!./node_modules/.bin/ts-node
// tslint:disable: no-console

import { Deployer } from './utils/deployer';

const deployer = new Deployer();

deployer.deployChanged('yarn deploy').then(() => {
  console.log('deploy done');
}).catch((err) => {
  console.error(err);
});

# bazooka-services ![](https://github.com/davidecavaliere/bazooka-services/workflows/Test+Build/badge.svg) [![codecov](https://codecov.io/gh/davidecavaliere/bazooka-services/branch/master/graph/badge.svg)](https://codecov.io/gh/davidecavaliere/bazooka-services)


This repo contains an example of how to set up a mono-repo api using the serverless framework and the @microgamma goodies.

### Features
- mono-repo with yarn workspaces and lerna
- shared apigateway and shared authorizer
- @microgamma/apigator and @microgamma/serverless-apigator (forget yml hell)
- @microgamma/datagor handles mongodb interaction from within aws lambda


## How to run the project
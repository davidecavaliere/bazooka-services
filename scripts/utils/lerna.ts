import { Log } from '@microgamma/loggator';
import { Inject, Injectable } from '@microgamma/digator';
import { Shell } from './shell';

@Injectable()
export class Lerna {

  @Log('@bazooka:scripts:deploy-changed')
  private $l;

  @Inject(Shell)
  private shell;

  constructor() {
    process.chdir(process.cwd());
  }

  public async listPackages() {
    const cmd = './node_modules/.bin/lerna list -a --json';
    return this.shell.exec(cmd);
  }

  public async getChanged(): Promise<any> {
    const cmd = './node_modules/.bin/lerna changed -a --json';
    const [resp, err] = await this.shell.exec(cmd);

    return resp;
  }
}
// tslint:disable:no-console

import { Injectable } from '@microgamma/digator';
import { exec } from "child_process";
import { Log } from '@microgamma/loggator';

@Injectable()
export class Shell {

  @Log('@bazooka:scripts:utils')
  private $l;


  public log(head: string, ...tail: string[]) {
    console.log('\x1b[36m%s\x1b[0m', `${head}`, ...tail);
  }

  public exec(cmd: string) {

    return new Promise<any>((res, rej) => {
      this.$l.d('executing', cmd);

      exec(cmd, (err, stdout, stderr) => {
        if (err) {
          this.$l.d('err', err);
          return rej(err);
        }

        let resp;

        try {
          resp = JSON.parse(stdout);
        } catch (e) {
          this.$l.d('not a json parsable object');
          resp = stdout;
        }

        res([resp, stderr]);

      });
    });
  }
}
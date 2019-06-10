import { Log } from '@microgamma/loggator';
import { Inject } from '@microgamma/digator';
import { Shell } from './shell';
import { Lerna } from './lerna';
import { LernaPackage } from './lerna-package.interface';

export class Deployer {

  @Log('@bazooka:scripts:deploy-changed')
  private $l;

  @Inject(Shell)
  private shell: Shell;

  @Inject(Lerna)
  private lerna: Lerna;

  private baseDir: string;

  constructor() {
    process.chdir(process.cwd());

    this.$l.d('running deploy changed script');
    this.$l.d('pwd', process.cwd());

    this.baseDir = process.cwd();
  }


  public async deployChanged(cmd: string) {
    const changed: [LernaPackage] = await this.lerna.getChanged();

    this.shell.log('Deployer:', `found ${changed.length} packages changed`);

    for (const p of changed) {
      const head = `${p.name}:${p.version}`;

      this.shell.log(head, 'entering directory', p.location);
      process.chdir(p.location);
      this.shell.log(head, 'deploying.....');
      const deployed = await this.shell.exec(cmd);

      this.shell.log(head, 'deployed');

      this.shell.log(head, deployed);

      process.chdir(this.baseDir);

    }

  }
}

import { Shell } from './shell'
import { join } from "path";

export class TSCShell extends Shell {

  constructor(tsc: string, cwd: string) {
    // super('tsc', null, { 'cwd': cwd });
    super('node', [tsc], { 'cwd': cwd })
    var last = '';
    this.onData = (data) => {
      last += data;
      if (data.indexOf('Watching for file changes.') != -1) {
        var correct = false;
        if (data.indexOf('Found 0 errors') != -1) {
          correct = true;
        }
        if (this.onCompileComplete) this.onCompileComplete(correct, last);
        last = '';
      }
    }
  }

  onCompileComplete: (correct?: boolean, error?: string) => void;
}
import { ChildProcess } from "child_process";
import { join } from "path";

var spawn = require('child_process').spawn;

export class Shell {

  /**
   * 
   * @param cmd 
   * @param params 
   * @param option cwd 当前工作目录
   */
  constructor(cmd: string, params?: string[], option?: any) {
    var free = spawn(cmd, params || [], option);

    // 捕获标准输出并将其打印到控制台
    free.stdout.on('data', (data) => {
      if (this.onData) this.onData(data + '');
    });

    // 捕获标准错误输出并将其打印到控制台
    free.stderr.on('data', (data) => {
      if (this.onError) this.onError(data + '');
    });

    // 注册子进程关闭事件
    free.on('exit', (code, signal) => {
      if (this.onExit) this.onExit(code, signal);
    });
    this.process = free;
  }

  public process: ChildProcess;

  onData: (content: string) => void;
  onError: (content: string) => void;
  onExit: (code: string, signal: any) => void;

  kill() {
    this.process.kill('SIGHUP');
  }
}
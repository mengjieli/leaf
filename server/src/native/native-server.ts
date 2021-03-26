import * as lib from "../lib/lib";
import "./../../libs/mobx/mobx"
import "./../../libs/msgpack/msgpack"
import "./../../libs/orange/orange"
import * as command from "./command/command"

let args = process.argv;
let rootPath = args[2];
let orangePath = args[3];
let serverPort = +args[4];

global["params"] = {
  rootPath: rootPath,
  orangePath: orangePath
}

export class NativeServer {

  constructor(port: number) {

    let server = new lib.WebsocketServer(NativeServerClient)
    server.start(port);
  }
}

class NativeServerClient extends lib.WebsocketServerClient {

  private lastSeq = 0;

  start(): void {
    let url = decodeURIComponent(this.request.resource.slice(2, this.request.resource.length))
    // console.log('[客户端连上]', url);
  }

  receive(data: Buffer) {
    if (data.length == 0) {
      this.receiveHert();
      return;
    }
    let info = msgpack.decode(new Uint8Array(data));
    let cmd = info.cmd;
    let seq = info.seq;
    let body = msgpack.decode(info.body);
    if (seq != this.lastSeq + 1) {
      // console.log('丢弃消息', cmd, seq, body);
      let msg = {
        "cmd": 'error',
        "rSeq": seq,
        "code": -2,
        "error": '服务器消息丢失',
        "body": {}
      };
      msg.body = msgpack.encode(msg.body);
      this.send(msgpack.encode(msg));
      return;
    }
    // console.log('[receive client]', cmd, seq,info, body);
    this.lastSeq = seq;
    if (command[cmd]) {
      let c: command.RequestCommand = new command[cmd]();
      c.cmd = cmd;
      c.seq = seq;
      c.body = body;
      c.client = this;
      c.execute().catch(e => {
        console.log(e)
        c.fail(-1, "内部错误:" + e);
      });
    } else {

    }
  }

  receiveHert() {
    this.send(new Uint8Array([]));
    // console.log('返回心跳')
  }

  readFileContent(cmd, seq, body): void {
    let file = new lib.File(body.url);
    file.readContent();
    let back = {
      'cmd': cmd,
      'rSeq': seq
    }
  }
}

new NativeServer(51443);


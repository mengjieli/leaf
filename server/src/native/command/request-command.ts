import * as lib from "../../lib/lib";
import "./../../../libs/msgpack/msgpack"
import { join } from "path";

export abstract class RequestCommand {

  cmd: string;
  seq: number;
  body: any;
  client: lib.WebsocketServerClient;

  abstract execute():Promise<any>;

  fail(errorCode: number, message: string = "") {
    this.send({
      "cmd": this.cmd,
      "rSeq": this.seq,
      "code": errorCode,
      "error": message,
      "body": {}
    });
  }

  success(body: any = null) {
    this.send({
      "cmd": this.cmd,
      "rSeq": this.seq,
      "code": 0,
      "error": "",
      "body": body || {}
    });
  }

  send(msg: any) {
    msg.body = msgpack.encode(msg.body);
    this.client.send(msgpack.encode(msg));
  }

  getRoot(path?: string) {
    return path ? join(global["params"].rootPath, path) : global["params"].rootPath;
  }

  getOrangePath(path?: string) {
    return path ? join(global["params"].orangePath, path) : global["params"].orangePath;
  }
}
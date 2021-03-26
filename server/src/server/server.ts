import { WebsocketServer, WebsocketServerClient } from "../lib/lib";

export class TestServer {

  constructor(port: number) {

    let server = new WebsocketServer(TestServerClient)
    server.start(port);
  }
}

class TestServerClient extends WebsocketServerClient {
  start(): void {
    let url = decodeURIComponent(this.request.resource.slice(2,this.request.resource.length))
    // console.log('客户端连上', url);
  }

  receive(data) {
    let info = msgpack.decode(new Uint8Array(data));
    let cmd = info.cmd;
    let seq = info.seq;
    let body = msgpack.decode(info.body);
    console.log('[receive]', cmd, seq, body);
    if (this[cmd]) this[cmd](cmd, seq, body);
  }

  Auth_Login(cmd, seq, body) {
    let token = 'xxx:' + body.info;
    let back = {
      'cmd': cmd,
      'rSeq': seq,
      'body': msgpack.encode({ 'token': token })
    }
    this.send(msgpack.encode(back));
  }
}


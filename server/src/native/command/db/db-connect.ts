import { RequestCommand } from "./../request-command";
import * as lib from "./../../../lib/lib"

export class DBConnect extends RequestCommand {

  public db: lib.MongoDB;


  async execute() {
    let url = this.body.url;
    let dbConnect = DBConnect.connections.get(url);
    if (dbConnect) {
      if (dbConnect.db.hasConnect) {
        this.success({ result: true });
      } else {
        let flag = await dbConnect.whenConnect();
        this.success({ result: flag });
      }
    } else {
      DBConnect.connections.set(url, this);
      this.connect(url);
      let flag = await this.whenConnect();
      this.success({ result: flag });
    }
  }

  async connect(url: string) {
    let db = this.db = new lib.MongoDB();
    await db.connect(url);
    this.resolves.forEach(call => call(true));
  }

  resolves = new Array<Function>();

  whenConnect() {
    return new Promise<boolean>(resolve => {
      this.resolves.push(resolve);
    })
  }

  static connections = new Map<string, DBConnect>();
}
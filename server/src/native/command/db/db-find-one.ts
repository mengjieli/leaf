import { RequestCommand } from "./../request-command";
import * as lib from "./../../../lib/lib"
import { DBConnect } from "./db-connect";

export class DBFindOne extends RequestCommand {

  async execute() {
    let url = this.body.url;
    let dbName = this.body.db;
    let collection = this.body.collection;
    let find = this.body.find;
    let res = await DBConnect.connections.get(url).db.getDB(dbName).getCollection(collection).findOne(find);
    this.success({ result: JSON.stringify(res) });
  }
}
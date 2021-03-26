import { RequestCommand } from "./../request-command";
import * as lib from "./../../../lib/lib"
import { DBConnect } from "./db-connect";

export class DBUpdateOne extends RequestCommand {

  async execute() {
    let url = this.body.url;
    let dbName = this.body.db;
    let collection = this.body.collection;
    let find = this.body.find;
    let data = this.body.data;
    let res = await DBConnect.connections.get(url).db.getDB(dbName).getCollection(collection).updateOne(find, data);
    this.success({ result: JSON.stringify(res) });
  }
}
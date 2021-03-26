import { RequestCommand } from "./request-command";
import * as lib from "./../../lib/lib"

export class FileReadFilesWithEnd extends RequestCommand {

  async execute() {
    let url = this.body.url;
    if (url == "" || url.slice(0, 2) == "./") url = this.getRoot(url);
    let file = new lib.File(url);
    let list = file.readFilesWithEnd(this.body.end);
    let res = [];
    list.forEach((f, index) => {
      res[index] = f.url.slice(url.length, f.url.length);
    })
    this.success({ list: res });
  }
}
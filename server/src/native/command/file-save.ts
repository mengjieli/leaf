import { RequestCommand } from "./request-command";
import * as lib from "./../../lib/lib"

export class FileSave extends RequestCommand {

  static files = {};

  async execute() {
    let index = this.body.index;
    let length = this.body.length;
    let url = this.body.url;
    if (index == 0 || !FileSave.files[url]) {
      FileSave.files[url] = "";
    }
    // console.error("????");
    FileSave.files[url] += this.body.content;
    if (index === undefined || index === length - 1) {
      if (url == "" || url.slice(0, 2) == "./") url = this.getRoot(url);
      let file = new lib.File(url);
      try {
        console.log('收到的数据:', FileSave.files[url].length)
        file.save(FileSave.files[url]);
        this.success({ result: true });
      } catch (e) {
        this.success({ result: false });
      }
      delete FileSave.files[url];
    }
  }
}
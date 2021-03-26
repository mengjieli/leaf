import { RequestCommand } from "./request-command";
import * as lib from "./../../lib/lib"

export class FileDelete extends RequestCommand {

  async execute() {
    let url = this.body.url;
    if (url == "" || url.slice(0, 2) == "./") url = this.getRoot(url);
    let file = new lib.File(url);
    try {
      file.delete();
      this.success({ result: true });
    } catch (e) {
      this.success({ result: false });
    }
  }

}
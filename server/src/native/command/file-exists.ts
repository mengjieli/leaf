import { RequestCommand } from "./request-command";
import * as lib from "./../../lib/lib"

export class FileExists extends RequestCommand {

  async execute() {
    let url = this.body.url;
    if (url == "" || url.slice(0, 2) == "./") url = this.getRoot(url);
    let file = new lib.File(url);
    if (file.exists) {
      this.success({ result: true });
    } else {
      this.success({ result: false });
    }
  }

}
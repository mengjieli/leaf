import { RequestCommand } from "./request-command";
import * as lib from "./../../lib/lib"
import { join } from "path";

export class FileWatch extends RequestCommand {

  async execute() {
    let url = this.body.url;
    let old = url;
    if (url == "" || url.slice(0, 2) == "./") url = this.getRoot(url);
    let file = new lib.File(url);
    if (file.exists) {
      let w = file.watch((urls) => {
        try {
          if (urls && urls.length) {
            var fileURL = urls[0];
            var content = (new lib.File(fileURL)).readContent();
            if (old == "" || old.slice(0, 2) == "./") {
              fileURL = join('./', fileURL.slice(this.getRoot('').length, fileURL.length));
              if (fileURL.charAt(0) != '.') {
                fileURL = './' + fileURL;
              }
            }
            this.send({
              "cmd": "OnWatch",
              "rSeq": 0,
              "code": 0,
              "error": "",
              "body": { file: fileURL, content: content }
            });
          }
        } catch (e) {
          w();
        }
      });
      this.success();
    } else {
      this.fail(1000, "文件不存在");
    }
  }
}
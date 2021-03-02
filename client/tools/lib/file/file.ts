import { statSync, readdirSync, existsSync, mkdirSync, writeFile, readFileSync, unlinkSync, rmdirSync, watch } from "fs";
import { sep, join } from 'path'
import { isUndefined } from "util";

export class File {

  constructor(url: string) {
    this._url = url;
    let name = url.split("/")[url.split("/").length - 1];
    if (name.split(".").length > 1) {
      this._end = name.slice(name.split(".")[0].length + 1, name.length);
    } else {
      this._end = "";
    }
  }

  delete() {
    if (this.exists == false) {
      return;
    }
    if (!this.isDirection) {
      unlinkSync(this.url);
    } else if (this.isDirection) {
      var list = readdirSync(this.url);
      for (var i = 0; i < list.length; i++) {
        let file = new File(this.url + "/" + list[i]);
        file.delete();
      }
      try {
        rmdirSync(this.url);
      } catch (e) {
        console.log(e);
      }
    }
  }

  watch(callBack: (urls: string[]) => void, time = 0.3): () => void {
    if (!global["$watchFile"]) {
      global["$watchFile"] = {
        "count": 0,
        "time": 0,
        "list": {}
      }
      var last = Date.now();
      setInterval(() => {
        var now = Date.now();
        var per = global["$watchFile"].time / (now - last)
        // console.log('watch file:', per, global["$watchFile"].count);
        global["$watchFile"].time = 0;
        last = now;
      }, 1000);
    }
    let dir = this.url;
    if (!global["$watchFile"][dir]) {
      global["$watchFile"].count++;
      var changes = {};
      var fswatch = watch(dir, { recursive: true }, (event, filename: string) => {
        changes[join(this.url, filename)] = true;
        setTimeout(() => {
          for (var k in changes) {
            backs.forEach(call => call([k]));
          }
          changes = {};
        }, 50);
      })

      let cancel = false;
      // let files = {};
      // let f = function () {
      //   var start = Date.now();
      //   try {
      //     let nfiles = {};
      //     let list = (new File(dir)).readFilesWithEnd("*");
      //     for (let i = 0; i < list.length; i++) {
      //       nfiles[list[i].url] = list[i].createTime
      //         + "," + list[i].changeTime + "," + list[i].modifyTime;
      //     }
      //     if (Object.keys(files).length != Object.keys(nfiles).length) {
      //       backs.forEach(call => call([]))
      //     } else {
      //       for (let key in nfiles) {
      //         if (!files[key] || files[key] != nfiles[key]) {
      //           backs.forEach(call => call([key]))
      //           break;
      //         }
      //       }
      //     }
      //     files = nfiles;
      //   } catch (e) { }
      //   global["$watchFile"].time += Date.now() - start;
      //   !cancel && setTimeout(f, time * 1000);
      // }.bind(this);
      // f();

      var cancelWatch = function () {
        cancel = true;
        fswatch.close();
      }

      var backs = new Set();
      global["$watchFile"][dir] = {
        add: (f) => {
          backs.add(f);
        },
        remove: (f) => {
          backs.delete(f);
          if (!backs.size) {
            // delete global["$watchFile"][dir];
            // cancelWatch();
          }
        }
      }
    }
    global["$watchFile"][dir].add(callBack);
    return () => {
      global["$watchFile"][dir].remove(callBack);
    }
  }

  async save(data, format: "utf-8" | "binary" = "binary", url?) {
    format = format === "binary" ? null : format;
    return new Promise<boolean>(resolve => {
      url = url || this.url;
      if (url.split("/").length > 1 || url.split(".").length == 1) {
        if (url.split(".").length == 1) {
          var dir = new File(url.slice(0, url.length - url.split("/")[url.split("/").length - 1].length));
          if (dir.exists == false) {
            File.mkdirsSync(url);
          }
        } else {
          File.mkdirsSync(url.slice(0, url.length - url.split("/")[url.split("/").length - 1].length));
        }
      }
      writeFile(url, data, format, function (err) {
        if (err) {
          console.log("保存文件失败！ url = " + url);
          resolve(false);
        } else {
          resolve(true);
        }
      })
    })
  }

  get isDirection(): boolean {
    return this.stats.isFile() ? false : true;
  }

  readContent(format: "utf-8" | "binary" = "utf-8"): any {
    try {
      if (!this.stats.isFile()) {
        return null;
      }
    } catch (e) {
      return null;
    }
    format = format === "binary" ? null : format;
    var content = readFileSync(this.url, format);
    return content;
  }

  readFilesWithEnd(ends: string | string[]): File[] {
    try {
      if (typeof ends == "string") {
        ends = [ends];
      }
      var files = [];
      if (this.stats.isFile()) {
        for (var i = 0; i < ends.length; i++) {
          var end = ends[i];
          if (end == "*" || end == this.end) {
            files.push(this);
          }
        }
      } else {
        var list = readdirSync(this.url);
        for (var i = 0; i < list.length; i++) {
          let file = new File(this.url + "/" + list[i]);
          files = files.concat(file.readFilesWithEnd(ends));
        }
      }
    } catch (e) { }
    return files;
  }

  private _url: string;

  get url(): string {
    return this._url;
  }

  private _end: string;

  get end(): string {
    return this._end;
  }

  get stats() {
    return statSync(this.url)
  }

  get list() {
    return readdirSync(this.url)
  }

  get exists(): boolean {
    return existsSync(this.url);
  }

  get changeTime(): number {
    return statSync(this.url).ctime.getTime();
  }

  get modifyTime(): number {
    return statSync(this.url).mtime.getTime();
  }

  get createTime(): number {
    return statSync(this.url).birthtime.getTime();
  }

  static mkdirsSync(dirpath: string, mode?) {
    if (!existsSync(dirpath)) {
      var pathtmp;
      dirpath.split(sep).forEach(function (dirname) {
        if (dirname == "") {
          pathtmp = "/"
          return;
        }
        if (pathtmp) {
          pathtmp = join(pathtmp, dirname);
        }
        else {
          pathtmp = dirname;
        }
        if (!existsSync(pathtmp)) {
          mkdirSync(pathtmp, mode);
        }
      });
    }
    return true;
  }
}
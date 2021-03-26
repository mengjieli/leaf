import { RequestCommand } from "./../request-command";
import * as lib from "./../../../lib/lib"
import { join, basename } from "path";

export class StartCompile extends RequestCommand {

  async execute() {
    let src = this.body.src;
    this.useModule = this.body.useModule;
    let srcPath = this.getRoot(src);
    var compiling = {};
    // console.log('[动态编译]', this.getRoot(''), src, srcPath)
    try {
      var file = new lib.File(srcPath);
      var url;
      var cancel = file.watch(urls => {
        // console.log('???!! change', urls);
        if (this.client.connected == false) cancel();
        if (urls.length) url = urls[0];
        // console.log('[文件变化]', url)
        if (url && url.slice(url.slice(url.length - 3, url.length)) != '.ts') {
          // console.log('change?', url)
          var file = new lib.File(url);
          if (file.exists) {
            var compiler: Compiler;
            if (!global["compileThread"]) {
              global["compileThread"] = new Compiler();
            }
            compiler = global["compileThread"]
            var source = file.readContent();
            compiler.pushCompile(url, source,
              (content: string) => {
                if (this.useModule) content = this.replaceModuleFile(content, url);
                this.send({
                  "cmd": "OnCompile",
                  "rSeq": 0,
                  "code": 0,
                  "error": "",
                  "body": { content: content, source: source, url: basename(url, src) }
                });
              });
          }
        }
      });
      this.success({ result: true });
    } catch (e) {
      console.log('[动态编译出错]');
      console.log(e);
      this.success({ result: false });
    }
  }

  useModule = true;

  replaceModuleFile(file: string, fileURL: string): string {
    fileURL = fileURL.slice(global["params"].rootPath.length, fileURL.length);
    let projectName = global["params"].rootPath.split("/")[global["params"].rootPath.split("/").length - 1];
    //var gd_chatmsg_1 = require("../generated/data/gd_chatmsg");
    var finds = file.match(/var [_a-zA-Z0-9_]+ = require\("[./0-9a-zA-Z_\-]+"\);/g)//file.match(/namespace[ \t]+[_a-zA-Z0-9.]+[ \t]+{/g);
    // console.log(finds);
    finds && finds.forEach(find => {
      // console.log(find);
      let oldFind = find;
      let name = find.match(/var [_a-zA-Z0-9_]+ =/)[0].slice(4, find.match(/var [_a-zA-Z0-9_]+ =/)[0].length - 2);
      let url = find.match(/require\("[./0-9a-zA-Z_\-]+"/)[0].slice("require(".length, find.match(/require\("[./0-9a-zA-Z_\-]+"/)[0].length);
      let oldURL = url;
      let requireFileName = url.split("/")[url.split("/").length - 1];
      // console.log("???!!!", requireFileName)
      requireFileName = requireFileName.slice(0, requireFileName.length - 1);
      let src = join(global["params"].rootPath, "src/");
      let files = (new lib.File(src)).readFilesWithEnd("ts");
      let findURL;
      // console.log(requireFileName)
      // console.log("~~~~", findURL)
      files.forEach(file => {
        let name = file.url.split("/")[file.url.split("/").length - 1];
        name = name.split(".")[0];
        if (name == requireFileName) {
          findURL = file.url;
        }
      })
      if (findURL) {
        findURL = findURL.slice(src.length, findURL.length);
        findURL = `"../${projectName}/src${findURL}"`;
        find = find.replace(oldURL, findURL);
      }
      file = file.replace(oldFind, find);
    })
    file = `var exports = require.c["../${projectName}${fileURL}"].exports;
    ${file}`;
    // console.log(file);
    file = `(()=>{
      ${file}
    })()`;
    return file;
  }

}

class Compiler {

  /**
   * 是否空闲
   */
  free = true;

  index = 0;

  constructor() {
    if (global["CompilerIndex"] == null) {
      global["CompilerIndex"] = 0;
    }
    this.index = global["CompilerIndex"]++;
  }

  /**
   * 创建 tsconfig
   * @param index 
   */
  createTSConfig() {
    var file = new lib.File(this.getPath("tsconfig.json"));
    file.save(`
              {
                "compilerOptions": {
                  "target": "es5",
                  "experimentalDecorators": true,
                  "lib": [
                    "es5",
                    "es2015"
                  ],
                  "downlevelIteration": true,
                  "types": [],
                  "watch": true,
                  "pretty": true
                }
              }`);
  }

  compileList = new Array<CompilerItemData>();
  compilingItem: CompilerItemData;

  hasCreateCompilerThread = false;

  createCompilerThread() {
    if (this.hasCreateCompilerThread) return;
    this.hasCreateCompilerThread = true;
    this.createTSConfig();
    var shell = new lib.TSCShell(this.getOrangePath('typescript/lib/tsc.js'), this.getPath());
    shell.onCompileComplete = this.onCompileComplete;
  }

  waitComplete = false;

  onCompileComplete = () => {
    if (this.waitComplete || !this.compilingItem) return;
    this.waitComplete = true;
    var start = Date.now();
    setTimeout(() => {
      if (this.compilingItem) {
        setTimeout(() => {
          this.compilingItem = null;
          this.waitComplete = false;
          // console.log('编译耗时:', Date.now() - start);
          this.compileNext();
        }, 0);
        // console.log('[ts编译完成]', this.getPath('f.js'))
        var file = new lib.File(this.getPath('f.js'));
        this.compilingItem.completes.forEach(call => call(file.readContent()));
        this.compilingItem.completes.length = 0;
      } else {
        this.waitComplete = false;
        this.compileNext();
      }
    }, 0);
  }

  compileNext() {
    if (this.compilingItem == null && this.compileList.length) {
      this.compilingItem = this.compileList.shift();
      var file = new lib.File(this.getPath('f.ts'));
      file.save(this.compilingItem.content);
    }
  }

  pushCompile(url: string, content: string, complete: (content: string) => void) {
    // console.log('compling ?', url);
    this.createCompilerThread();
    if (this.compilingItem && this.compilingItem.content == content) {
      this.compilingItem.completes.push(complete);
      return;
    }
    for (var i = 0; i < this.compileList.length; i++) {
      if (this.compileList[i].url == url) {
        this.compileList[i].content = content;
        this.compileList[i].completes.push(complete);
        return;
      }
    }
    var item = new CompilerItemData();
    item.url = url;
    item.content = content;
    item.completes = [complete];
    this.compileList.push(item);
    if (this.compileList.length == 1) this.compileNext();
  }

  getPath(fileName = ""): string {
    return join(this.getOrangePath("tempcompiler/" + this.index + "/"), fileName);
  }

  getOrangePath(path?: string) {
    return path ? join(global["params"].orangePath, path) : global["params"].orangePath;
  }
}

class CompilerItemData {

  completes: ((content: string) => void)[];

  content: string;

  url: string;
}
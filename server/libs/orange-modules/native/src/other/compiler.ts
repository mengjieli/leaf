/**
 * @internal
 */
var $e = eval;

namespace orangeNative {

  export namespace native {

    export var eval = null;

    export class Compiler {

      /**
       * @internal
       */
      private src: string;

      constructor(srcDir = Compiler.src) {
        if (Compiler.lock) {
          throw new Error('不能初始化 Compiler');
        }
        this.src = srcDir;
      }

      /**
       * @internal
       */
      start() {
        NativeClient.instance.send({
          "cmd": "StartCompile",
          "params": {
            "src": this.src,
            "useModule": Compiler.useModule
          }
        });
        NativeClient.instance.addMessageBack('OnCompile', (data) => {
          this.backs.forEach(call => call(data.body.content, data.body.source, data.body.url));
        })
      }

      /**
       * @internal
       */
      private backs = [];

      /**
       * @internal
       */
      private static lock = true;

      /**
       * @internal
       */
      private static instance: Compiler;

      /**
       * @internal
       */
      private static get ist(): Compiler {
        if (!Compiler.instance) {
          Compiler.lock = false;
          Compiler.instance = new Compiler();
          Compiler.instance.start();
          Compiler.lock = true;
        }
        return Compiler.instance;
      }

      private static useModule = true;

      /**
       * 源文件的目录
       */
      public static src = './src'

      /**
       * 当项目中有文件编译时
       * @param back (file: string, source?: string, url?: string) => void 回调被编译后的 js 文件和源文件以及文件路径
       */
      public static onCompile(back: (file?: string, source?: string, url?: string) => void): void {
        Compiler.ist.backs.push(back);
      }

      /**
       * 自动编译，比 onCompile 更进一层会运行编译后的 js 文件，触发对应的 autoload 内容
       * @param back (file: string, source?: string) => void 回调被编译后的 js 文件和源文件
       */
      public static autoCompile(back?: (file?: string, source?: string, url?: string) => void) {
        try {
          var $call = window["eui"].DataGroup.prototype.updateRenderer;
          window["eui"].DataGroup.prototype.updateRenderer = function () {
            try {
              $call.apply(this, arguments);
            } catch (e) {
              console.error(e);
            }
          }
        } catch (e) {
        }


        setTimeout(() => {
          try {
            var $getDefinitionByName = window['egret'].getDefinitionByName;
            window['egret'].getDefinitionByName = function (name) {
              var r = orange.GetUtil.getFromGlobal(name);
              if (r) {
                return r;
              }
              return $getDefinitionByName.apply(this, arguments);
            }

            var $call = window["eui"].Component.prototype.$onAddToStage;
            window["eui"].Component.prototype.$onAddToStage =
              // function (stage, nestLevel) {
              //   this.$super.$onAddToStage.call(this, stage, nestLevel);
              //   this.checkInvalidateFlag();
              //   var values = this.$UIComponent;
              //   if (!values[29 /* initialized */]) {
              //     values[29 /* initialized */] = true;
              //     try{this.createChildren();}catch(e){console.error(e);};
              //     this.childrenCreated();
              //     window["eui"].UIEvent.dispatchUIEvent(this, window["eui"].UIEvent.CREATION_COMPLETE);
              //   }
              // };
              function () {
                try {
                  $call.apply(this, arguments);
                } catch (e) {
                  console.error(e);
                }
              }
            var $tweenTo = window["egret"].Tween.prototype.to;
            window["egret"].Tween.prototype.to = function () {
              var res = null;
              try {
                res = $tweenTo.apply(this, arguments);
              } catch (e) {
                console.error(e);
              }
              return res;
            }
            var $tweenSet = window["egret"].Tween.prototype.set;
            window["egret"].Tween.prototype.set = function () {
              var res = null;
              try {
                res = $tweenSet.apply(this, arguments);
              } catch (e) {
                console.error(e);
              }
              return res;
            }
          } catch (e) {
            console.log(e)
          }
        }, 0);

        Compiler.ist.backs.push((file, source, url) => {
          if (!source)
            return;
          var f = file;
          var before = "var $$$records = {};\n";
          before += "console.log('进入文件:" + url + "')\n";
          var namespaces = [];
          Compiler.currentCompile = true;
          var finds = source.match(/namespace[ \t]+[_a-zA-Z0-9.]+[ \t]+{/g);
          if (finds) {
            var keys = "";
            var obj = window;
            finds.forEach(function (exp) {
              var key = exp.slice("namespace".length, exp.length - 1).match(/[_a-zA-Z0-9.]+/)[0];
              var arr = key.split(".");
              arr.forEach(key => {
                obj = obj[key];
                keys += (keys.length ? "." : "") + key;
                namespaces.push(keys);
                before += "if(orange.GetUtil.getFromGlobal(\"" + keys + "\")) {\n";
                before += " $$$records[\"" + keys + "\"] = {};\n";
                before += " for(var k in orange.GetUtil.getFromGlobal(\"" + keys + "\")) \n";
                before += "   $$$records[\"" + keys + "\"][k] = orange.GetUtil.getFromGlobal(\"" + keys + "\")[k]; \n";
                before += "}\n";
                for (var k in obj) {
                  before += "var " + k + ";orange.GetUtil.watchFromGlobal(\"" + keys + "." + k + "\",(value)=> { \n" + k + " = value;\n});\n";
                }
              })
            });
          }
          var end = "\n";
          end += "var $$$namespaces = {}\n";
          namespaces.forEach(function (value) { return end += "$$$namespaces[\"" + value + "\"] = " + value + ";\n"; });
          end += "\n";
          end += "for(var k1 in $$$records) { \n";
          end += "  for(var k2 in $$$records[k1]) { \n";
          end += "    if($$$namespaces[k1][k2] && $$$namespaces[k1][k2] != $$$records[k1][k2]) { \n";
          end += "      orange.GetUtil.setFromGlobal(k1 + '.' + k2, $$$namespaces[k1][k2]) \n";
          end += "    }";
          end += "  }";
          end += "}";
          end += "\n";
          file = 'try{\n' + before + "\n" + file + end + '\n}catch(e){\nconsole.log("compile error:");console.log(e);orange.native.Compiler.currentCompile=false;\n}';
          if (Compiler.useModule) {
            file = f;
            // file = Compiler.replaceModuleFile(f);
          }
          (native.eval || $e || window["orange_eval"])('orange.BreakUtil.break("编译文件: ' + url + '");\n' + file);
          if (Compiler.currentCompile && back)
            back(f, source, url);
        });
      }



      /**
       * @internal
       */
      private static currentCompile = true;
    }
  }

  export function onFileUpdate() {

  }
}


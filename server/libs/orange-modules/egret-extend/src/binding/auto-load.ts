namespace egretExtend {

  var records = {};
  var start = false;

  export var autoload = function (name?: string, exmlClass?: string | string[], clearFunction = "close", params?: any) {
    // if (!orange.debug) return;
    if (name == null) {
      orange["getAutoloadClassName"](className => {
        name = className;
        if (!exmlClass) exmlClass = name + "Skin";
        if (typeof exmlClass == 'string') {
          $autoloadSkin(name, exmlClass);
        } else if (exmlClass instanceof Array) {
          exmlClass.forEach(exml => $autoloadSkin(name, exml));
        }
      })
    } else {
      if (typeof exmlClass == 'string') {
        $autoloadSkin(name, exmlClass);
      } else if (exmlClass instanceof Array) {
        exmlClass.forEach(exml => $autoloadSkin(name, exml));
      }
    }
    return orange.autoload(name, clearFunction, params);
  }

  /**
   * 链接自动装载，在此文件改变时可以重新装载新的文件，并重新运行标记为 name 的类（如果已经在运行的话）
   * @param name 
   */
  export var autoloadLink = function (name: string, exmlClass: string | string[]) {
    // if (!orange.debug) return;
    if (typeof exmlClass == 'string') {
      $autoloadSkin(name, exmlClass);
    } else if (exmlClass instanceof Array) {
      exmlClass.forEach(exml => $autoloadSkin(name, exml));
    }
  }

  function $autoloadSkin(name, exmlClass) {
    orange.autoloadLink(name)
    records[exmlClass] = name;
    // records[url] = name;
    if (!start) {
      start = true;
      var c = setInterval(() => {
        if (orange.native.isReady()) {
          clearInterval(c);
          (new orange.native.File('./resource')).watch((url, content) => {
            if (!content) {
              return;
            }
            if (content.charCodeAt(0) == 65279) {
              content = content.slice(1, content.length);
            }
            var url = url.split('?')[0];
            var end = url.split('.')[url.split('.').length - 1];
            if (end == 'exml') {
              var find = content.match(/class="[_|a-zA-Z.]+[a-zA-Z0-9.]*"/);
              if (find && find.length) {
                content = content.replace(find[0], find[0].slice(0, find[0].length - 1) + ~~(Math.random() * 1000000000) + '"')
                find = find[0].match(/"[_|a-zA-Z.]+[a-zA-Z0-9.]*"/);
                var clazz = find[0].slice(1, find[0].length - 1);
                if (clazz) {
                  orange.BreakUtil.break("编译皮肤: " + url);
                  try {
                    var euiclazz = (new eui.sys.EXMLParser()).parse(content);
                    orange.GetUtil.setFromGlobal(clazz, euiclazz);
                    if (records[clazz]) {
                      orange.loadlink(records[clazz]);
                    } else if (records[url]) {
                      orange.loadlink(records[url]);
                    }
                  } catch (e) {
                    console.log('[autoload error]', e);
                  }
                }
              }
            }
          })
        }
      }, 16);
    }
  }
}
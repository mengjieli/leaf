namespace orange {

  var instances = {};
  var classes = {};

  export var autoloadInstance = instances;

  var $getAutoloadClassName = null;
  /**
   * @internal
   */
  export function getAutoloadClassName(back) {
    $getAutoloadClassName = back;
  }

  /**
   * 自动装载，在文件改变时可以将此类以弹幕的方式发送到运行环境
   * @param name 
   * @param clearFunction 
   * @param params 
   */
  export function autoload(name?: string, clearFunction = "close", params?) {
    return <T extends { new(...args: any[]) }>(c: T) => {
      if (!orange.debug) return c;
      if (name == null) {
        if (c.prototype["$className"]) {
          name = "game." + c.prototype["$className"];
        } else {
          name = "game." + c.name;
        }
      }
      if ($getAutoloadClassName) $getAutoloadClassName(name);
      $getAutoloadClassName = null;
      var hasInstance = false;
      let oldParams = {};
      var args;
      if (instances[name]) {
        try {
          params && params.setParams && params.setParams.forEach(atr => oldParams[atr] = instances[name].instance[atr]);
          if (params && params.clear) {
            params.clear(item);
          } else {
            var item = instances[name];
            args = item.args;
            item.instance[clearFunction]();
            hasInstance = true;
          }
        } catch (e) {
          hasInstance = true;
          console.error(e);
        }
      }
      class AutoLoadClass extends c {
        constructor(...args) {
          try {
            super(...args);
          } catch (e) {
            console.error(e);
          }
          instances[name] = {
            instance: this,
            args: args
          }
          var clear = this[clearFunction];
          if (clear) this[clearFunction] = function () {
            if (instances[name] && instances[name].instance == this) instances[name] = null;
            clear.apply(this, arguments);
          }
          if (params && params.init) params.init(this);
        }
      }
      classes[name] = {
        clazz: AutoLoadClass,
        clearFunction: clearFunction
      }
      var arr = name.split('.');
      var obj: any = () => { };
      try {
        obj = window;
        for (var i = 0; i < arr.length; i++) {
          if (i == arr.length - 1) {
            obj[arr[i]] = AutoLoadClass;
          } else {
            obj = obj[arr[i]] || {};
          }
        }
      } catch (e) {
      }
      if (hasInstance) {
        setTimeout(() => {
          let newItem = new AutoLoadClass(...args);
          params && params.setParams && params.setParams.forEach(atr => newItem[atr] = oldParams[atr]);
        })
      }
      return AutoLoadClass;
    }
  }

  export function loadlink(name) {
    setTimeout(() => {
      if (instances[name]) {
        var args;
        try {
          var item = instances[name];
          args = item.args;
          item.instance[classes[name].clearFunction]();
        } catch (e) {
          console.error(e);
        }
        try {
          new classes[name].clazz(...args);
        } catch (e) {
          console.error(e);
        }
      }
    })
  }

  /**
   * 链接自动装载，在此文件改变时可以重新装载新的文件，并重新运行标记为 name 的类（如果已经在运行的话）
   * @param name 
   */
  export var autoloadLink = function (name) {
    loadlink(name);
  }
}
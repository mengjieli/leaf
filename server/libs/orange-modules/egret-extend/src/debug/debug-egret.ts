namespace egretExtend {

  /**
   * @internal
   */
  export var egretStage: egret.Stage;

  /**
   * 返回毫秒 (保留小数点后面3位)
   */
  export function now(): number {
    return Date.now();
    var t;
    if (window["wx"]) {
      t = getPerformance().now();
      if (getSystemInfoSync().platform != "devtools") {
        t = t / 1000;
      }
    } else {
      t = performance.now();
    }
    t = (~~(t * 1000)) / 1000;
    return t;
  }

  /**
   * @internal
   */
  export function now2(): number {
    var t;
    if (window["wx"]) {
      t = getPerformance().now();
      if (getSystemInfoSync().platform != "devtools") {
        t = t / 1000;
      }
    } else {
      t = performance.now();
    }
    t = (~~(t * 1000)) / 1000;
    return t;
  }

  function start() {
    try {
      getStage();
    } catch (e) {
      console.warn('[orange egret debug error]', e)
    }
  }

  var $info = null;
  /**
   * @interface
   */
  function getSystemInfoSync() {
    if (!$info) {
      $info = window["wx"].getSystemInfoSync();
    }
    return $info;
  }

  var $perfermance;
  function getPerformance() {
    if (!$perfermance) {
      if (window["wx"] && window["wx"].getPerformance) {
        $perfermance = window["wx"].getPerformance();
      } else {
        $perfermance = performance;
      }
    }
    return $perfermance;
  }

  /**
   * @interface
   */
  function getStage() {
    //$onAddToStage(stage: Stage, nestLevel: number)
    let old = egret.DisplayObject.prototype.$onAddToStage;
    egret.DisplayObject.prototype.$onAddToStage = function (stage: egret.Stage, nestLevel: number) {
      old.call(this, stage, nestLevel);
      if (stage && !egretStage) {
        egretStage = this.stage;
        startDebugImage();
        egret.DisplayObject.prototype.$onAddToStage = old;
      }
    }
  }

  var $hasStartDebug = false;
  export function $startDebug() {
    if ($hasStartDebug) return;
    $hasStartDebug = true;
    try {
      if (orange.debug) {
        startDebugCall();
        startDebugDraw();
      }
    } catch (e) {
      console.warn('[orange egret debug error]', e)
    }
  }

  start();
}
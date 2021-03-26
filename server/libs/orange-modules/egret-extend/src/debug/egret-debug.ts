
namespace egretExtend {

  export class EgretDebug extends egret.Sprite {

    start(now: number): void {

    }

    update(now: number): void {

    }

    get lastHashCount(): number {
      return 0;
    }

  }

  export function filterDisplay(filer: (display: egret.DisplayObject, stack?: number) => [boolean, boolean], display?: egret.DisplayObject): egret.DisplayObject[] {
    display = display || egretStage;
    var list = [];
    var f = (display: egret.DisplayObject, stack = 0) => {
      var [scanChild, addSum] = filer(display, stack);
      if (addSum) list.push(display);
      if (!scanChild) return;
      if (display instanceof egret.DisplayObjectContainer) {
        for (var i = 0; i < display.numChildren; i++) {
          f(display.getChildAt(i), stack + 1);
        }
      }
    }
    f(display);
    return list;
  }

  export function displaySum(type?: any) {
    var display = egretStage;
    var sum = 0;
    var list = [];
    var f = (display: egret.DisplayObject) => {
      if (display instanceof egret.Stage) {
        if (display instanceof egret.DisplayObjectContainer) {
          for (var i = 0; i < display.numChildren; i++) {
            f(display.getChildAt(i));
          }
        }
        return;
      }
      if (!display.visible) return;
      if (!type || type && (display instanceof type)) {
        list.push(display);
        sum++;
      }
      if (display instanceof egret.DisplayObjectContainer) {
        for (var i = 0; i < display.numChildren; i++) {
          f(display.getChildAt(i));
        }
      }
    }
    f(display);
    return list;
  }

  export function displayTouchSum() {
    var display = egretStage;
    var sum = 0;
    var f = (display: egret.DisplayObject) => {
      if (!display.visible) return;
      if (display.touchEnabled) {
        sum++;
      }
      if (display instanceof egret.DisplayObjectContainer && display.touchChildren) {
        for (var i = 0; i < display.numChildren; i++) {
          f(display.getChildAt(i));
        }
      }
    }
    f(display);
    console.log(sum);
    return sum;
  }
}

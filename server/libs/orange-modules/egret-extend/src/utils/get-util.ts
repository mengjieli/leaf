namespace egretExtend {

  export class GetUtil {

    public static getInParent<T extends egret.DisplayObject>(display: egret.DisplayObject, type: { new(): T }): T {
      if (display instanceof type) return display;
      while (display && display.parent && display.parent != display) {
        display = display.parent;
        if (display instanceof type) return display;
      }
      return null;
    }

    public static isInTargetParent<T extends egret.DisplayObject>(display: egret.DisplayObject, p: egret.DisplayObjectContainer): boolean {
      if (display === p) return true;
      while (display && display.parent && display.parent != display) {
        display = display.parent;
        if (display === p) return true;
      }
      return false;
    }
  }
}
namespace egretExtend {

  class IDD extends egret.DisplayObject {
    aaaa?: number;
  }

  export var observer = <T extends IDD, TB extends new () => T>(c: TB): TB => {
    // orange.constructorCall(c.prototype, (thisObj: IDisplay) => {
    //   thisObj['update'] && thisObj['update'](); 
    //   console.log('构造函数调用', thisObj);
    // });
    return orange.observer(c) as any;
  }

  /**
   * @internal
   * @param thisObj 
   */
  function assertDisplayObject(thisObj: any, type: string) {
    if (!(thisObj instanceof egret.DisplayObject)) {
      throw type + ' 修饰的对象不是 egret.DisplayObject 类型的，无法使用此装饰器'
    }
  }

  var updateSymbol = Symbol('orange egret update');
  function addUpdate(thisObj: egret.DisplayObject, call: (dt: number) => any): void {
    if (!thisObj[updateSymbol]) {
      thisObj[updateSymbol] = new Set();
      let last;
      let f = () => {
        let now = Date.now();
        for (let call of thisObj[updateSymbol]) {
          call(now - last);
        }
        last = now;
      }
      thisObj.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
        last = Date.now();
        thisObj.addEventListener(egret.Event.ENTER_FRAME, f, thisObj);
      }, null);
      thisObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
        thisObj.removeEventListener(egret.Event.ENTER_FRAME, f, thisObj);
      }, null);
    }
    thisObj[updateSymbol].add(call);
  }

  export function update(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor {
    orange.constructorCall(target, (thisObj: egret.DisplayObject) => {
      assertDisplayObject(thisObj, '@orange.egret.enterFrame');
      addUpdate(thisObj, (dt: number) => {
        thisObj[key](dt);
      })
    });
    return baseDescriptor;
  }
}
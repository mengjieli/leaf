namespace egretExtend {

  interface IBind {
    (bindKey: string): (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
    emit: (bindKey: string) => (target: Object, key: string, baseDescriptor?: PropertyDescriptor) => void;
  }

  /**
   * 绑定某个数据
   * @deprecated
   * @param target 
   * @param key 
   * @param baseDescriptor 
   */
  export var bind: IBind = (function (bindKey: string) {
    orange.APIUtil.deprecatedTip('egretExtend.bind', 1543464755206);
    return function (target: Object, key: string, baseDescriptor?: PropertyDescriptor) {
      orange.addAutorun(target, function () {
        this[key] = this[bindKey];
      });
      return baseDescriptor;
    }
  }) as any;

  /**
   * 绑定并抛出事件
   * @deprecated
   */
  bind.emit = (function (bindKey: string) {
    orange.APIUtil.deprecatedTip('egretExtend.bind.emit', 1543464755206);
    return function (target: Object, key: string, baseDescriptor?: PropertyDescriptor) {
      orange.addAutorun(target, function () {
        this[key] = this[bindKey];
        orange.emitWith(this, key, this[bindKey]);
      });
      return baseDescriptor;
    }
  }) as any;

  /**
   * @egretExtend.render 是 @orange.autorun 的扩展功能，在对象添加到舞台上并且 skin 加载完成时才开始响应，对象从舞台移除时停止响应
   * @param target 
   * @param key 
   * @param baseDescriptor 
   */
  export function render(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor {
    orange.autorunExtend(target, key, (thisObj, start, stop) => {
      if (thisObj instanceof egret.DisplayObject) {
        thisObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, stop, thisObj);
        if (thisObj instanceof eui.Component) {
          thisObj.addEventListener(eui.UIEvent.COMPLETE, () => {
            if (thisObj.stage && thisObj.skin) start();
          }, thisObj);
          thisObj.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
            if (thisObj.stage && thisObj.skin) start();
          }, thisObj);
          if (thisObj.stage && thisObj.skin) start();
        } else {
          thisObj.addEventListener(egret.Event.ADDED_TO_STAGE, start, thisObj);
          if (thisObj.stage) start();
        }
      } else {
        throw 'render 只能修饰显示对象(egret.DisplayObject)';
      }
    });
    return baseDescriptor;
  }
}


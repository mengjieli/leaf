/**
 * @internal
 */
let run = (() => {
  try {
    return autorun;
  } catch (e) {
    return null;
  }
})();

namespace egret {
  export class DisplayObject {
    addEventListener(...args) {

    }
  }

  export class Event {
    static ADDED_TO_STAGE = "ADDED_TO_STAGE";
    static REMOVED_FROM_STAGE = "REMOVED_FROM_STAGE";
  }
}

/**
 * @internal
 */
let ract = (() => {
  try {
    return reaction;
  } catch (e) {
    return null;
  }
})();


namespace orange {
  /**
   * @internal
   */
  export var uuid = 1;

  /**
   * 装饰成员变量的接口
   */
  interface IPropertyDescriptor {
    (target: Object, key: string, baseDescriptor?: PropertyDescriptor): any
  }

  /**
   * 绑定装饰器类型
   * @internal
   */
  interface IBind {
    /**
     * @param bindProperty - 绑定属性
     */
    (bindProperty: string): IPropertyDescriptor
    emit: (bindProperty: string) => IPropertyDescriptor
  }


  /**
   * 计算装饰器类型
   */
  interface ICalculate {
    (target: Object, key: string, baseDescriptor?: PropertyDescriptor): any
    emit: IPropertyDescriptor
  }

  /**
   * 优化计算值的装饰器
   */
  export var calculate: ICalculate = ((target: Object, key: string, baseDescriptor?: PropertyDescriptor) => {
    return computed(target, key, baseDescriptor);
  }) as any

  calculate.emit = function (target: Object, key: string, baseDescriptor?: PropertyDescriptor) {
    APIUtil.deprecatedTip('orange.calculate.emit', 1543464755206);
    let value = createHideProperty(target);
    if (!value.autorunEvent) {
      value.autorunEvent = [];
    }
    value.autorunEvent.indexOf(key) == -1 && value.autorunEvent.push(key);
    return computed(target, key, baseDescriptor);
  }

  interface IWatch {
    (target: Object, key: string, baseDescriptor?: PropertyDescriptor): any
    emit: IPropertyDescriptor
  }

  export var watch: IWatch = ((t, o, p): any => {
    return observable(t, o, p);
  }) as any;

  watch.emit = ((t, o, p): any => {
    APIUtil.deprecatedTip('orange.watch.emit', 1543464755206);
    let value = createHideProperty(t);
    if (!value.autorunEvent) {
      value.autorunEvent = [];
    }
    value.autorunEvent.indexOf(o) == -1 && value.autorunEvent.push(o);
    return observable(t, o, p);
  });

  /**
   * 在函数中对观测属性进行更改
   * @param t 
   * @param o 
   * @param p 
   */
  export var modify = function (t, o, p) {
    return action["bound"].call(null, t, o, p);
  }

  var stopRunSymbol = Symbol('orange stop autorun function');
  var startRunSymbol = Symbol('orange start autorun function');
  var stopSymbol = Symbol('orange stop');
  var autorunSymbol = Symbol('orange autorun');


  /**
   * 
   * @deprecated orange.autorunClass 已迁移至 orange.observer
   * @param c 
   */
  export var autorunClass = <T extends { new(...args: any[]) }>(c: T) => {
    APIUtil.deprecatedTip('orange.autorunClass', 1543464755206, '已迁移至 orange.observer');
    return observer(c);
  }

  /**
   * 自动运行装饰器，使得一些主动的属性装饰器生效
   * @param c 需要装饰的类
   */
  export var observer = <T extends { new(...args: any[]) }>(c: T) => {
    let value = getHideProperty(c.prototype);
    if (!c.prototype.$className) c.prototype.$className = c.name;
    if (value && value.data) return c;
    if (!value) return;
    value.data = true;
    return class OrangeObserver extends c {
      startRunSymbol: any = []
      stopRunSymbol: any = []
      stopSymbol = false
      constructor(...args) {
        super(...args);
        if (!this.uuid) this.uuid = uuid++;
        value.constructorCalls && value.constructorCalls.map(func => {
          let f = () => {
            func.call(this);
          }
          this.startRunSymbol.push(f);
          this.stopRunSymbol.push(autorun(f));
        });
        let _this: any = this;
        if (value.autorun) {
          value.autorun.map((item) => {
            let f = () => {
              this[item[0]] = this[item[1]];
              if (item[2]) {
                if (_this[$eventSymbol] && _this[$eventSymbol][item[0]]) {
                  emitWith(this, item[0], this[item[1]]);
                }
              }
            }
            this.startRunSymbol.push(f);
            this.stopRunSymbol.push(autorun(f));
          });
        }
        if (value.autorunEvent) {
          let firsts = {};
          value.autorunEvent.map(key => {
            let record = undefined;
            let f = () => {
              this[key];
              if (this[key] != null && (typeof this[key] == 'number' || typeof this[key] == 'string')) {
                if (record === undefined) {
                  record = this[key];
                } else {
                  if (record === this[key]) {
                    return;
                  } else {
                    record = this[key];
                  }
                }
              }
              if (firsts[key]) {
                let _this: any = this;
                if (_this[$eventSymbol] && _this[$eventSymbol][key]) {
                  emitWith(this, key, this[key]);
                }
              }
              else firsts[key] = true;
            }
            this.startRunSymbol.push(f);
            this.stopRunSymbol.push(autorun(f));
          });
        }
        if (value[autorunSymbol]) {
          let set = value[autorunSymbol] as Set<(thisObj: any) => void>;
          set.forEach(call => call(this));
        }
      }
    }
  }

  /**
   * 停止对象的自动处理事物，否则对象无法释放
   * @param obj 
   */
  export function stop(obj: any) {
    if (obj.stopRunSymbol && !obj.stopSymbol) {
      for (let func of obj.stopRunSymbol) {
        func();
      }
      obj.stopRunSymbol.length = 0;
      obj.stopSymbol = true;
    }
  }

  /**
  * 启动对象的自动处理事物
  * @param obj 
  */
  export function start(obj: any) {
    if (obj.startRunSymbol && obj.stopSymbol) {
      for (let func of obj.startRunSymbol) {
        obj.stopRunSymbol.push(autorun(func));
      }
      obj.stopSymbol = false;
    }
  }

  export interface AutorunBack extends PropertyDescriptor {
    /**
     * 调用后取消 autorun 的执行
     */
    (): void;
  }

  var renderSymbol = Symbol('orange render list');

  /**
   * @internal
   * @param target 
   * @param classMethodName 
   */
  export function addInsideAutorunToClass(target: any, classMethodName: string, autoStop: boolean = false): void {
    let value = createHideProperty(target);
    value[autorunSymbol] || (value[autorunSymbol] = new Set());
    (value[autorunSymbol] as Set<any>).add((thisObj: any) => {
      if (autoStop && thisObj instanceof egret.DisplayObject) {
        let f = () => {
          thisObj[classMethodName].call(thisObj);
        };
        let cancelAutorun = null;
        if (!thisObj[renderSymbol]) thisObj[renderSymbol] = {};
        if (!thisObj[renderSymbol][classMethodName]) {
          thisObj[renderSymbol][classMethodName] = true;
          (thisObj as egret.DisplayObject).addEventListener(egret.Event.ADDED_TO_STAGE, () => {
            if (!cancelAutorun) cancelAutorun = autorun(f);
          }, thisObj);
          (thisObj as egret.DisplayObject).addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (cancelAutorun) cancelAutorun();
            cancelAutorun = null;
          }, thisObj);
        }
      } else {
        let f = thisObj[classMethodName].bind(thisObj);
        thisObj.startRunSymbol.push(f);
        thisObj.stopRunSymbol.push(autorun(f));
      }
    });
  }

  /**
   * 添加响应函数，可以自行决定函数何时启动响应和停止响应
   * @param classDefine 类定义
   * @param classMethodName  函数名
   * @param init 在类的构造函数中会自动调用此函数，init 的三个参数: thisObj 表示对象，startRun 启动函数响应，startRun 停止函数响应
   */
  export function autorunExtend(classDefine: any, classMethodName: string, init: (thisObj: any, startRun: Function, stopRun: Function) => void): void {
    let value = createHideProperty(classDefine);
    value[autorunSymbol] || (value[autorunSymbol] = new Set());
    (value[autorunSymbol] as Set<any>).add((thisObj: any) => {
      if (!thisObj[renderSymbol]) thisObj[renderSymbol] = {};
      if (!thisObj[renderSymbol]['$component_' + classMethodName]) {
        thisObj[renderSymbol]['$component_' + classMethodName] = true;
        let f = thisObj[classMethodName].bind(thisObj);
        let cancelAutorun = null;
        let startRun = () => {
          if (!cancelAutorun) cancelAutorun = autorun(f);
        }
        let stopRun = () => {
          if (cancelAutorun) cancelAutorun();
          cancelAutorun = null;
        }
        init(thisObj, startRun, stopRun);
      }
    });
  }

  /**
   * 使用 @orange.observer 装饰的类对象在构造函数中会调用 call
   * @param classDefine 类定义
   * @param call 需要调用的方法
   */
  export function constructorCall(classDefine: any, call: (thisObj: any) => void): void {
    let value = createHideProperty(classDefine);
    value[autorunSymbol] || (value[autorunSymbol] = new Set());
    (value[autorunSymbol] as Set<any>).add(call);
  }

  /**
   * @internal
   */
  var observerSymbol = Symbol('observer')

  // export function setObserver(target: any, observer: any) {
  //   target[observerSymbol] = observer;
  // }

  /**
   * 
   * @param target 
   * @param key 
   * @param baseDescriptor 
   */
  export function render(target: any, key: string, baseDescriptor: PropertyDescriptor): PropertyDescriptor {
    APIUtil.deprecatedTip('@orange.render', 1543464755206, '请使用 @orange.egret.render 替代');
    addInsideAutorunToClass(target, key, true);
    return baseDescriptor;
  }

  export function autorun(target: any | (() => any), key?: string, baseDescriptor?: PropertyDescriptor): AutorunBack {
    if (!key) {
      if (debug) {
        Debug.autorunCount++;
        Debug.autorunSum++;
        let cancel = run(target);
        return () => {
          Debug.autorunCount--;
          cancel();
          cancel = null;
        }
      } else {
        return run(target);
      }
    }
    addInsideAutorunToClass(target, key);
    return baseDescriptor as any;
  }

  /**
   * 响应函数，会返回一个清除函数，用以清除响应，如果是在 expression 中清除是不会触发 effect 的
   * @param expression 表达式，响应函数只会观察表达式中访问过的值，表达式函数需要返回一个参数，作为 effect 函数的第一个参数
   * @param effect 效果函数，此响应函数不会对 effect 中访问过的可观测值作出响应
   * @param compare 比较函数，用于比较改变时 expression 返回的值，只有返回 false 才执行 effect，默认的情况是只有 expression 的返回值变了才会触发 effect
   */
  export function reaction<T>(expression: () => T
    , effect: (arg: T) => void
    , compare?: (a: T, b: T) => boolean): Function {
    let opt: any = {
      fireImmediately: true
    };
    if (compare) opt.equals = compare
    return ract(r => {
      return expression();
    }, (arg, r) => {
      effect(arg);
    }, opt);
  }
}
namespace orange {

  const __decorate = function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect["decorate"] === "function") r = Reflect["decorate"](decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  /**
   * 对数据对象注入方法
   * getters 将使用 orange.calculate 装饰
   */
  export const extendClass = function <T extends new (...args: any[]) => any>(cls: T, getters?: MapLike<() => any>, methods?: MapLike<Function>) {
    const proto = cls.prototype;
    if (!proto) {
      return;
    }
    if (getters) {
      for (const key in getters) {
        const func = getters[key];
        Object.defineProperty(proto, key, {
          get: func,
          enumerable: true,
          configurable: true
        });
        __decorate([
          orange.calculate
        ], proto, key, null);
      }
    }
    if (methods) {
      for (const key in methods) {
        const func = methods[key];
        proto[key] = func;
      }
    }
  }
}
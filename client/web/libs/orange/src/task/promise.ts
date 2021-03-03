namespace orange {

  /**
   * 如果 Promise 函数返回 reject 
   * @param func 
   * @param waitTime 
   * @param tryMax 
   */
  export var tryPromise = function <T>(func: (resolve: (r: T) => any, reject: Function) => any, waitTime = 1000, tryMax = 3) {
    return new Promise((resolve, reject) => {
      var f = function () {
        var flag = false;
        func((...args) => {
          if (flag) return;
          flag = true;
          resolve.apply(null, args);
        }, e => {
          if (flag) return;
          flag = true;
          tryMax--;
          if (tryMax > 0) setTimeout(f, waitTime);
          else reject(e)
        });
      };
      f();
    });
  }
}
namespace orange {

  export class APIUtil {

    /**
     * 提示接口已废弃
     * @param methodName 
     */
    static deprecatedTip = (() => {
      let tips = {};
      return (methodName: string, time: number, more: string = '') => {
        if (!tips[methodName]) {
          tips[methodName] = true;
          let date = new Date();
          date.setTime(time);
          console.warn('[废弃的 api] ' + methodName + '  更新时间:' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '  提示:' + more);
        }
      }
    })();

    static deprecated() {
    }
  }
}
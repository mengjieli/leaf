namespace orange {

  /**
   * 调试参数
   */
  export var debug: boolean = true;

  var starts = [];

  export function addStartBack(call: (params: StartupParams) => Promise<void>) {
    starts.push(call);
  }

  /**
   * 启动参数
   */
  export interface StartupParams {
    debug?: boolean, //调试开关，打开后会多出一些调试信息，一些辅助功能的开关也依赖于 debug，正式发布后只需关闭 debug 即可关闭辅助功能
    egret?: { //egret-extend 相关功能
      stage: any, //白鹭的舞台类
      debugWin?: boolean //调试窗口
    },
    native?: { //native 相关功能
      ip?: string, //本地服务器 ip，默认值为 "localhost"
      port?: number, //本地服务器端口，默认为 51443
      autoCompile?: boolean //是否开启自动编译
    }
  }

  export async function startup(params: StartupParams = null) {
    if (!debug) {
      try {
        window['_getGlobalState']().disableErrorBoundaries = true;
      } catch (e) {
      }
    }
    params = params || {};
    if (params.debug != null) debug = params.debug;
    for (let call of starts) {
      await call(params);
    }
  }
}

try {
  window["orange"] = orange;
} catch (e) {
  try {
    global["orange"] = orange;
  } catch (e) {
  }
}

// console.log('[orange version] 0.9.0')
namespace syncData {

  export var loginError: '未收到 token' | '无法链接服务器'

  export async function login(params: WeiXinLoginInfo) {
    let info = await getPlatformInfo(params.btnConfig);
    orange.debug && console.log("[login] step 1/4 : getPlatformInfo ok!");
    let token = await authLogin(params.url, info, params.getLoginParams, params.compressed) as string;
    orange.debug && console.log("[login] step 2/4 : authLogin ok!");
    let proxy = await checkToken(token, params);
    orange.debug && console.log("[login] step 3/4 : checkToken ok!");
    await gameLogin(proxy, info);
    orange.debug && console.log("[login] step 4/4 : gameLogin ok!");
    return proxy;
  }

  async function getPlatformInfo(btnConfig: any) {
    var sdk = window['sdk'];
    return new Promise((resolve, reject) => {
      sdk.login((user, err) => {
        if (err) {
          reject(new Error('认证错误'));
        } else {
          let info = JSON.stringify(user);
          resolve(info);
        }
      }, btnConfig)
    });
  }

  async function authLogin(url, info, getLoginParams?: () => any, encoding?: 'gzip', close?: any) {
    var hasLogin = false;
    return orange.tryPromise((resolve, reject) => {
      encoding && (url = `${url}?encoding=${encoding}`);
      connect(url, {
        closeHandler: r => {
          if (hasLogin == false) {
            !hasLogin && reject(new Error('未收到 token'));
          } else {
            close && close(r);
          }
        },
        compressed: encoding
      }).then(proxy => {
        var params = {
          "platform": "hortor",
          "info": info
        }
        if (getLoginParams) {
          var ps = getLoginParams();
          for (var k in ps) params[k] = ps[k];
        }
        proxy.request({
          "cmd": "Auth_Login",
          "params": params
        }).then((resp) => {
          proxy.connection.close();
          hasLogin = true;
          resolve(resp.body.token);
        })
      }).catch(reason => {
        reject(new Error('无法链接服务器'));
      });
    })
  };

  export function checkToken(token: string, params: WeiXinLoginInfo, close?: any) {
    return orange.tryPromise((resolve, reject) => {
      var url = params.url;
      url = `${url}?token=${encodeURIComponent(token)}`;
      params.compressed && (url = `${url}&encoding=${params.compressed}`);
      connect(url, params).then(proxy => {
        resolve(proxy);
      }).catch(r => {
        reject(new Error('无法链接服务器'));
      })
    })
  }

  export function gameLogin(proxy, info) {
    return orange.tryPromise((resolve, reject) => {
      let data = {
        "cmd": "Game_Login",
        "params": {
          "platform": "hortor",
          "info": info
        },
      }
      proxy.request(data).then((resp) => {
        if (resp.errorCode == 0) {
          resolve(resp.body);
        }
      }).catch((err) => {
        reject(err);
      })
    })
  }

  export interface WeiXinLoginInfo extends ConnectParams {
    /**
     * 平台，固定值
     */
    platform: 'weixin';
    /**
     * 服务器地址
     */
    url: string;
    /**
     * 登陆按钮配置
     */
    btnConfig: any;
    /**
     * 获取登陆参数，会把返回结果加入到 Auth_Login 消息参数中
     */
    getLoginParams: () => any;
  }
}
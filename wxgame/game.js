import './js/libs/weapp-adapter'
import './js/libs/ecs'
import './js/libs/leaf'
import './js/libs/eui'
import './js/libs/tiny2d'
import './js/libs/mobx'
import './js/libs/msgpack'
import './js/libs/orange'
import './js/libs/native'
import './js/libs/sync-data'
import './js/libs/behavior-tree'
import './js/libs/tween'
import './js/libs/puzzle-script'

import './js/main'

window["IS_WEB"] = false;

var fs = window.wxfs = wx.getFileSystemManager();
window.wxloadText = function (url, onComplete) {
  fs.readFile({
    filePath: url,
    encoding: "utf-8",
    success: function (a) {
      onComplete(a.data)
    },
    fail: function (a) {
      console.error(a)
    }
  })
}

wx.onShareAppMessage(function () {
  // 用户点击了“转发”按钮
  return {
    title: '老婆在家千万不能开...'
  }
})


wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline']
})

let debug = false;

orange.debug = debug;


wx.cloud.init({
  env: debug ? "debug-6g9awi179fc698c1" : "elimination-u6401"
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  // env: 'my-env-id',
})

new window.Main();

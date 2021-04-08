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
import './js/libs/symbol'

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

new window.Main();

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




// wx.shareAppMessage({
//   title: '老婆在家千万不能开...'
// })
